const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");
const orgMembersResolver = require("../services/org.resolver");

async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store, channels = [], authContext, recievers, orgCoverage } = payload;

        let recieversList = recievers ? (Array.isArray(recievers) ? recievers : [recievers]) : [];
        const actorId = authContext?._id || authContext?.userId;

        // resolve roles/teams if orgCoverage is provided
        if (orgCoverage) {
            const roles = orgCoverage.roles || [];
            const teams = orgCoverage.teams || [];

            if (roles.length > 0) {
                const recipientsByRoles = await orgMembersResolver.resolveMembersUsingRoles(orgId, roles);
                recieversList = [...recieversList, ...recipientsByRoles];
            }

            if (teams.length > 0) {
                const recipientsByTeams = await orgMembersResolver.resolveMembersUsingTeams(orgId, teams);
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

        // Originator Exclusion: Filter out the actor who triggered the notification
        if (actorId) {
            uniqueRecipientsMap.forEach((val, key) => {
                if (String(val.userId) === String(actorId)) {
                    uniqueRecipientsMap.delete(key);
                }
            });
        }

        const finalRecievers = Array.from(uniqueRecipientsMap.values());

        // publish to channels with recievers resolved.
        for (let channel of channels) {
            console.log(`[+] SENDING ${channel.toUpperCase()} EVENT FOR ${finalRecievers.length} RECIPIENTS`);
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
            // Check both root payload and nested notification object for owners/userIds
            let userIds = payload.owners || payload.userIds || notification.owners || notification.userIds || [];
            
            // Fallback: If no owners/userIds provided, try to extract from recieversList
            if (!userIds.length && recieversList.length) {
                userIds = [...new Set(recieversList.map(r => r.userId || r._id).filter(id => id))];
            }

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
            console.log("[+] NOTIFICATION STORED ", noti?._id);
        }

        channel.ack(msg);
    }
    catch (err) {
        console.log("[+] ERROR WHILE HANDLING EVENT IN NOTIFICATION QUEUE", err.message);
        return channel.ack(msg);
    }
}

async function main() {
    await mqbroker.consume("notification", "notification", notificationHandler, 'notificationsQueue');
}

module.exports = main;