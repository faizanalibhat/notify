const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");
const orgMembersResolver = require("../services/org.resolver");

async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store, channels = [], authContext, recievers, orgCoverage, event_key } = payload;
        console.log(`[NOTIFY] Processing event: ${event_key} for Org: ${orgId}`);

        let recieversList = recievers ? (Array.isArray(recievers) ? recievers : [recievers]) : [];
        const actorId = authContext?._id || authContext?.userId;
        console.log(`[NOTIFY] Actor: ${actorId}, Initial Recievers: ${recieversList.length}`);

        // resolve roles/teams if orgCoverage is provided
        if (orgCoverage) {
            const roles = orgCoverage.roles || [];
            const teams = orgCoverage.teams || [];
            console.log(`[NOTIFY] Resolving OrgCoverage: Roles=${JSON.stringify(roles)}, Teams=${JSON.stringify(teams)}`);

            if (roles.length > 0) {
                const recipientsByRoles = await orgMembersResolver.resolveMembersUsingRoles(orgId, roles);
                console.log(`[NOTIFY] Resolved ${recipientsByRoles.length} members by roles`);
                recieversList = [...recieversList, ...recipientsByRoles];
            }

            if (teams.length > 0) {
                const recipientsByTeams = await orgMembersResolver.resolveMembersUsingTeams(orgId, teams);
                console.log(`[NOTIFY] Resolved ${recipientsByTeams.length} members by teams`);
                recieversList = [...recieversList, ...recipientsByTeams];
            }
        }

        // Standardize recipient objects to have email and userId
        recieversList = recieversList.map(r => ({
            email: r.email,
            userId: r.userId || r._id || r.id
        })).filter(r => r.email);

        // Deduplicate recipients by email
        const uniqueRecipientsMap = new Map();
        recieversList.forEach(r => {
            if (!uniqueRecipientsMap.has(r.email)) {
                uniqueRecipientsMap.set(r.email, r);
            }
        });

        // Originator Exclusion: Strictly filter out the actor from both DELIVERY and STORAGE
        if (actorId) {
            uniqueRecipientsMap.forEach((val, key) => {
                if (String(val.userId) === String(actorId)) {
                    console.log(`[NOTIFY] Strictly excluding Actor ${actorId} from all channels`);
                    uniqueRecipientsMap.delete(key);
                }
            });
        }

        const finalRecievers = Array.from(uniqueRecipientsMap.values());
        console.log(`[NOTIFY] Total recipients after exclusion: ${finalRecievers.length}`);

        // publish to channels with recievers resolved.
        for (let channel of channels) {
            console.log(`[NOTIFY] Publishing to channel: ${channel.toUpperCase()}`);
            await mqbroker.publish("notification", `notification.${channel}`, {
                ...payload,
                recievers: finalRecievers,
                event_id: payload.event_id,
                trace_id: payload.trace_id,
                template_id: payload.template_id
            });
        }

        if (store && Object.keys(notification || {})?.length) {
            // New structure: userIds (owners), actor, target
            let userIds = payload.owners || payload.userIds || notification.owners || notification.userIds || [];
            
            // Fallback: If no owners/userIds provided, use the filtered list
            if (!userIds.length && uniqueRecipientsMap.size > 0) {
                userIds = Array.from(uniqueRecipientsMap.values()).map(r => r.userId).filter(Boolean);
            }

            console.log(`[NOTIFY] Storing notification for UserIDs: ${JSON.stringify(userIds)}`);

            let actor = notification.actor;
            if (!actor && authContext) {
                actor = {
                    id: authContext?._id,
                    name: authContext?.firstName + " " + authContext?.lastName,
                    email: authContext?.email,
                    avatar: authContext?.avatar,
                    type: "user"
                }
            }

            let title_html = payload.title_html || notification.title_html;

            let obj = {
                orgId,
                ...notification,
                userIds,
                actor,
                target: payload.target || notification.target,
                context: payload.context || notification.context,
                event_key: payload.event_key,
                ui_context: payload.ui_context,
                title_html,
                origin: payload.origin || notification.origin
            };

            // Remove legacy fields if they exist to keep it clean
            delete obj.owners;
            delete obj.user;

            const noti = await notificationService.createNotification(orgId, obj);
            console.log(`[NOTIFY] SUCCESS: Notification stored with ID: ${noti?._id}`);
        }

        channel.ack(msg);
    }
    catch (err) {
        console.log("[NOTIFY] FATAL ERROR", err.message);
        return channel.ack(msg);
    }
}

async function main() {
    await mqbroker.consume("notification", "notification", notificationHandler, 'notificationsQueue');
}

module.exports = main;