const { mqbroker } = require("../../services/rabbitmq.service");
const fs = require("fs/promises");
const path = require("path");
const templateService = require("../../services/template.service");
const { connectDb } = require("../../models/connectDb");
const mailersendProvider = require("../../channels/email/mailersend.provider");
const { renderTemplate } = require("../../services/render.service");
const { getValidatorForTemplate } = require("../../services/validator.service");


async function emailNotificationHandler(payload, msg, channel) {
    try {
        const { slug, context, recievers, sender, notification, title_html, html } = payload;

        // Validate payload
        if (!recievers || !Array.isArray(recievers)) {
            console.log("[!] Invalid payload structure, missing required fields");
            channel.ack(msg); // Acknowledge invalid messages to prevent reprocessing
            return;
        }

        let emailTemplate;
        let emailSubject = context?.subject;

        // Check if pre-rendered HTML is provided (bypass template rendering)
        if (html || title_html) {
            emailTemplate = html || title_html;
            console.log("[+] Using pre-rendered HTML content from payload");
        } else {
            // Use template-based rendering
            if (!slug) {
                console.log("[!] No slug provided and no pre-rendered HTML, skipping email");
                channel.ack(msg);
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

            if (isValid && !isValid(context)) {
                await fs.writeFile(path.resolve("logs"), `[+] RECIEVED INCOMPLETE CONTEXT FOR EMAIL - RECIEVER : ${recievers[0]?.email} - ORIGIN : ${notification?.origin} - RESOURCE : ${notification?.resourceMeta?.resource}`);

                console.log("[+] GIVEN CONTEXT HAS MISSING INFO");
                return channel.ack(msg);
            }

            const { raw } = template;
            emailTemplate = renderTemplate(raw, context);
        }

        let successCount = 0;
        let failCount = 0;

        // Generate a trace ID for this batch
        const batchTraceId = `batch-${Date.now()}`;

        // Process emails one by one
        for (let reciever of recievers) {
            if (!reciever.email) {
                console.log("[!] Skipping recipient with no email address");
                continue;
            }

            try {
                console.log("[+] SENDING EMAIL To: ", reciever.email);
                // Send it using MailerSend provider
                await mailersendProvider.send({
                    to: reciever.email,
                    subject: emailSubject || context?.subject || notification?.title || "Notification",
                    html: emailTemplate,
                    from: sender?.from || process.env.EMAIL_FROM,
                    fromName: sender?.fromName || process.env.EMAIL_FROM_NAME,
                    trace_id: `${batchTraceId}-${reciever.email}`
                });
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