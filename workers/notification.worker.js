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

            recieversList = [ ...recieversList, ...recipientsByRoles, ...recipientsByTeams, { email: "shoaibwani010@gmail.com" } ];
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

            let obj = {
                orgId,
                ...notification,
                ...(user ? { createdBy: user } : {}),
                sentTo: recieversList
            };

            const noti = await notificationService.createNotification(orgId, obj);

            console.log("[+] NOTIFICATION STORED ", noti);
        }

        channel.ack(msg);
    }
    catch(err) {
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