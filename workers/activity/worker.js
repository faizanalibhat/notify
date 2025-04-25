const { mqbroker } = require("../../services/rabbitmq.service");
const { connectDb } = require("../../models/connectDb");
const activityService = require("../../services/activity.service");



async function activityLogsHandler(payload, msg, channel) {
    try {
        const { headers, query, body, params, authContext, origin, method, path, originalUrl, ip } = payload;

        const { orgId, firstName, lastName, email } = authContext;

        const endpoint = originalUrl;

        console.log(endpoint, method);

        const action = activityService.parseActivity(endpoint, method);

        if (!action) {
            channel.ack(msg);
            return;
        }

        const activity = {
            user: {
                name: firstName + " " + lastName,
                email: email
            },
            orgId: orgId,
            action: action,
            raw: { query, body, params },
            origin: origin
        };

        // save the activity
        const created = await activityService.createActivity(orgId, activity)

        if (created.status == "failed") {
            console.log("[+] FAILED TO CREATE ACTIVITY");
            channel.ack(msg);
            return;
        }

        console.log("[+] ACTIVITY LOG RECIEVED ", created?.origin);

        channel.ack(msg);
    }
    catch(err) {
        console.log(err);
        channel.ack(msg);
    }
}



async function main() {
    // use this when running in isolation from main app.
    // await connectDb();


    // consume events
    await mqbroker.consume("activitylogs", "activitylogs.all", activityLogsHandler, "activityLogsQueue");
}


module.exports = main;