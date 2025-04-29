const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");
const orgMembersResolver = require("../services/org.resolver");



async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store, channels = [], authContext, recievers, orgCoverage } = payload;

        let recieversList = Array.isArray(recievers) ? recievers : [recievers];

        // based on the org coverage, populate the reciever with their emails.
        if (orgCoverage) {

            // can be specified via roles, teams
            let roles = orgCoverage.roles;
            let teams = orgCoverage.teams;

            let recipientsByRoles = orgMembersResolver.resolveMembersUsingRoles(orgId, roles);
            let recipientsByTeams = orgMembersResolver.resolveMembersUsingTeams(orgId, teams);

            console.log(recipientsByRoles);
            console.log(recipientsByTeams);

            // add them to the reciever list

            recieversList = [...recieversList, ...recipientsByRoles, ...recipientsByTeams];
        }

        // publish to channels with recievers resolved.
        for (let channel of channels) {
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
        console.log("[+] ERROR WHILE HANDLING EVENT", err.message);
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