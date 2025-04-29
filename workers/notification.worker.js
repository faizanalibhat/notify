const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");
const orgMembersResolver = require("../services/org.resolver");



async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store, channels = [], authContext, reciever, orgCoverage } = payload;

        let recievers = Array.isArray(reciever) ? reciever : [reciever];

        // based on the org coverage, populate the reciever with their emails.
        if (orgCoverage) {

            // can be specified via roles, teams
            let roles = orgCoverage.roles;
            let teams = orgCoverage.teams;

            let recipientsByRoles = orgMembersResolver.resolveMembersUsingRoles(orgId, roles);
            let recipientsByTeams = orgMembersResolver.resolveMembersUsingTeams(orgId, teams);

            // add them to the reciever list

            recievers = [...recievers, ...recipientsByRoles, ...recipientsByTeams];
        }

        console.log("recievers resolved: ", recievers);

        // publish to channels with recievers resolved.
        for (let channel of channels) {
            await mqbroker.publish("notification", `notification.${channel}`, { ...payload, reciever: recievers });
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
                sentTo: recievers
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