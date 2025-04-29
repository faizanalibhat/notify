const { mqbroker } = require("../../services/rabbitmq.service");
const templateService = require("../../services/template.service");
const { connectDb } = require("../../models/connectDb");
const transport = require("../../channels/email/index");
const { renderTemplate } = require("../../services/render.service");



async function emailNotificationHandler(payload, msg, channel) {
    try {
        const { slug, context={}, recievers, sender, notification } = payload;

        const template = await templateService.getTemplateBySlug(slug);

        if (template.status == "failed") {
            console.log("[+] SLUG DOES NOT MATCH ANY TEMPLATE");
            channel.ack(msg);
        }

        const { raw } = template;

        const transporter = transport();

        const emailTemplate = renderTemplate(raw, context);


        for (let reciever of recievers) {
            // setup the email object
            const email = {
                from: sender?.from || process.env.EMAIL_FROM,
                to: reciever.email,
                subject: context?.subject,
                text: 'There is no email body',
                html: emailTemplate
            };

            // send it using the transporter
            const response = await transporter.sendMail(email);
        }

        console.log("[+] EMAILS HAVE BEEN SENT TO ", recievers?.length , " CONTACTS");

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
    await mqbroker.consume("notification", "notification.email", emailNotificationHandler, "emailNotificationsQueue");
}


module.exports = main;