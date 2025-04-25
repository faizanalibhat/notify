const { mqbroker } = require("../services/rabbitmq.service");
const { connectDb } = require("../models/connectDb");
const notificationService = require("../services/notification.service");


async function notificationHandler(payload, msg, channel) {
    try {
        const { orgId, notification, store=true, channels = [], authContext } = payload;

        for (let channel of channels) {
            await mqbroker.publish("notification", `notification.${channel}`, payload);
        }

        if (store && Object.keys(notification || {})?.length) {

            let user = notification.user

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
                ...(user ? user : {})
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