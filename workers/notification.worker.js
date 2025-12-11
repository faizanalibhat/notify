const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");
const orgMembersResolver = require("../services/org.resolver");



async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store, channels = [], authContext, recievers, orgCoverage } = payload;

        let recieversList = recievers ? Array.isArray(recievers) ? recievers : [recievers] : [];

        // based on the org coverage, populate the reciever with their emails.
        if (orgCoverage) {

            // can be specified via roles, teams
            let roles = orgCoverage.roles;
            let teams = orgCoverage.teams;

            let recipientsByRoles = await orgMembersResolver.resolveMembersUsingRoles(orgId, roles);
            let recipientsByTeams = await orgMembersResolver.resolveMembersUsingTeams(orgId, teams);

            recieversList = [...recieversList, ...recipientsByRoles, ...recipientsByTeams];
        }

        // publish to channels with recievers resolved.
        for (let channel of channels) {
            console.log("[+] SENDING EMAIL EVENT FOR EMAIL ", recieversList);
            await mqbroker.publish("notification", `notification.${channel}`, { ...payload, recievers: recieversList });
        }

        if (store && Object.keys(notification || {})?.length) {

            let user = notification.user;

            if (authContext) {
                user = {
                    name: authContext?.firstName + " " + authContext?.lastName,
                    email: authContext?.email,
                    userId: authContext?._id
                }
            }

            // If title_html is passed in the payload (like from ASM), use it directly.
            // Otherwise, try to construct it if missing.
            let title_html = payload.title_html || notification.title_html;

            console.log("[+] NOTIFY WORKER - PAYLOAD TITLE_HTML:", payload.title_html);
            console.log("[+] NOTIFY WORKER - NOTIFICATION TITLE_HTML:", notification.title_html);
            console.log("[+] NOTIFY WORKER - RESOLVED TITLE_HTML:", title_html);

            if (!title_html && user && notification.resourceMeta) {
                const { vulnTitle, resourceName, resource } = notification.resourceMeta;
                const { resourceUrl } = notification;

                if (vulnTitle) {
                    title_html = `<a target='_blank' href="/user/${user.userId}"><b>${user.name}</b></a> reported the vuln <a href="${resourceUrl}">${vulnTitle}</a>`;
                } else if (resource === 'scan' && resourceName) {
                    title_html = `<a target='_blank' href="/user/${user.userId}"><b>${user.name}</b></a> started the scan <a href="${resourceUrl}">${resourceName}</a>`;
                }
            }

            let obj = {
                orgId,
                ...notification,
                title_html,
                ...(user ? { createdBy: user } : {}),
                sentTo: recieversList
            };

            const noti = await notificationService.createNotification(orgId, obj);

            console.log("[+] NOTIFICATION STORED ", noti);
        }

        channel.ack(msg);
    }
    catch (err) {
        console.log("[+] ERROR WHILE HANDLING EVENT IN NOTIFICATION QUEUE", err.message);
        return channel.ack(msg);
    }
}



async function main() {
    // use this when running in isolation from main app.
    // await connectDb();


    // consume events
    await mqbroker.consume("notification", "notification", notificationHandler, 'notificationsQueue');
}


module.exports = main;