const { mqbroker } = require("../../services/rabbitmq.service");
const fs = require("fs/promises");
const path = require("path");
const templateService = require("../../services/template.service");
const { connectDb } = require("../../models/connectDb");
const transport = require("../../channels/email/index");
const { renderTemplate } = require("../../services/render.service");
const { getValidatorForTemplate } = require("../../services/validator.service");


const transporter = transport();


async function emailNotificationHandler(payload, msg, channel) {
    try {
        const { slug, context, recievers, sender, notification } = payload;

        // Validate payload
        if (!slug || !recievers || !Array.isArray(recievers)) {
            console.log("[!] Invalid payload structure, missing required fields");
            channel.ack(msg); // Acknowledge invalid messages to prevent reprocessing
            return;
        }

        const template = await templateService.getTemplateBySlug(slug);

        if (template.status === "failed") {
            console.log("[+] SLUG DOES NOT MATCH ANY TEMPLATE");
            channel.ack(msg); // Acknowledge as this isn't recoverable
            return;
        }
        
        if (!context) {
            console.log("[+] CONTEXT MISSING, SKIPPING EMAIL");
            channel.ack(msg);
            return;
        }

        const isValid = getValidatorForTemplate(slug);

        if (!isValid(context)) {
            await fs.writeFile(path.resolve("logs"), `[+] RECIEVED INCOMPLETE CONTEXT FOR EMAIL - RECIEVER : ${reciever.email} - ORIGIN : ${notification.origin} - RESOURCE : ${notification?.resourceMeta?.resource}`);

            console.log("[+] GIVEN CONTEXT HAS MISSING INFO");
            return channel.ack(msg);
        }

        const { raw } = template;
        const emailTemplate = renderTemplate(raw, context);
        let successCount = 0;
        let failCount = 0;

        // Process emails one by one
        for (let reciever of recievers) {
            if (!reciever.email) {
                console.log("[!] Skipping recipient with no email address");
                continue;
            }

            // Setup the email object
            const email = {
                from: sender?.from || process.env.EMAIL_FROM,
                to: reciever.email,
                subject: context?.subject,
                text: 'There is no email body',
                html: emailTemplate
            };

            try {
                console.log("[+] SENDING EMAIL To: ", reciever.email);
                // Send it using the transporter
                await transporter.sendMail(email);
                successCount++;
            }
            catch(err) {
                console.log(`[-] FAILED TO SEND EMAIL TO ${reciever.email}: ${err.message}`);
                failCount++;
                // Continue to next recipient instead of returning
            }
        }

        console.log(`[+] EMAILS SENT: ${successCount} SUCCESS, ${failCount} FAILED OUT OF ${recievers.length} CONTACTS`);
        
        // Only acknowledge the message once at the end
        channel.ack(msg);
    }
    catch(err) {
        console.log(`[+] ERROR WHILE HANDLING EVENT: ${err.message}`);
        
        // For unexpected errors, we need to decide whether to requeue or not
        // If it's a transient error (like network issues), we might want to retry
        // If it's a permanent error (like malformed data), we should not retry
        
        // For now, acknowledging to prevent reprocessing after restart
        // Consider using nack with requeue=false for permanent errors
        channel.ack(msg);
    }
}


async function main() {
    // use this when running in isolation from main app.
    // await connectDb();


    // consume events
    await mqbroker.consume("notification", "notification.email", emailNotificationHandler, "emailOnlyNotificationsQueue");
}


module.exports = main;