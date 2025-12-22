const { mqbroker } = require("../../services/rabbitmq.service");
const fs = require("fs/promises");
const path = require("path");
const templateService = require("../../services/template.service");
const { connectDb } = require("../../models/connectDb");
const { renderTemplate } = require("../../services/render.service");
const { getValidatorForTemplate } = require("../../services/validator.service");
const idempotencyService = require("../../services/idempotency.service");
const emailProvider = require("../../providers/email.provider");

// Channel identifier for idempotency
const CHANNEL = "email";

async function emailNotificationHandler(payload, msg, channel) {
    // Extract key fields
    const {
        event_id,
        trace_id,
        template_id,
        slug: oldSlug, // Fallback
        context,
        recievers,
        sender,
        notification
    } = payload;

    const logPrefix = `[${trace_id || 'NO_TRACE'}] [${event_id || 'NO_EVENT'}]`;

    try {
        // 1. Validate mandatory fields
        if (!recievers || !Array.isArray(recievers)) {
            console.log(`${logPrefix} [!] Invalid payload structure, missing receivers`);
            return channel.ack(msg);
        }

        // Use template_id if available, otherwise fallback to slug
        const templateKey = template_id || oldSlug;

        if (!templateKey) {
            console.log(`${logPrefix} [!] Missing template_id (and no slug fallback)`);
            return channel.ack(msg);
        }

        // 2. Idempotency Check
        if (event_id) {
            const isDuplicate = await idempotencyService.checkAndRecord(event_id, CHANNEL);
            if (isDuplicate) {
                console.log(`${logPrefix} [+] Duplicate event detected. Skipping.`);
                return channel.ack(msg);
            }
        } else {
            console.log(`${logPrefix} [!] WARNING: No event_id provided. Idempotency disabled.`);
        }

        // 3. Load Template
        const template = await templateService.getTemplateBySlug(templateKey);

        if (!template || template.status === "failed") {
            console.log(`${logPrefix} [+] TEMPLATE NOT FOUND OR FAILED: ${templateKey}`);
            if (event_id) await idempotencyService.updateStatus(event_id, CHANNEL, "failed");
            return channel.ack(msg);
        }

        if (!context) {
            console.log(`${logPrefix} [+] CONTEXT MISSING, SKIPPING EMAIL`);
            if (event_id) await idempotencyService.updateStatus(event_id, CHANNEL, "failed");
            return channel.ack(msg);
        }

        // 4. Validate Context
        const isValid = getValidatorForTemplate(templateKey);
        if (!isValid(context)) {
            console.log(`${logPrefix} [+] GIVEN CONTEXT HAS MISSING INFO`);
            if (event_id) await idempotencyService.updateStatus(event_id, CHANNEL, "failed");
            return channel.ack(msg);
        }

        const { raw } = template;
        const emailBody = renderTemplate(raw, context);
        let successCount = 0;
        let failCount = 0;

        // 5. Send Emails
        for (let reciever of recievers) {
            if (!reciever.email) {
                console.log(`${logPrefix} [!] Skipping recipient with no email address`);
                continue;
            }

            try {
                await emailProvider.send({
                    to: reciever.email,
                    subject: context.subject,
                    html: emailBody,
                    text: 'This email contains HTML content.', // Could be improved if template has text version
                    trace_id: trace_id
                });
                successCount++;
            } catch (err) {
                console.log(`${logPrefix} [-] FAILED TO SEND EMAIL TO ${reciever.email}: ${err.message}`);
                failCount++;
            }
        }

        console.log(`${logPrefix} [+] EMAILS SENT: ${successCount} SUCCESS, ${failCount} FAILED OUT OF ${recievers.length} CONTACTS`);

        // 6. Update Idempotency Status
        if (event_id) {
            await idempotencyService.updateStatus(event_id, CHANNEL, successCount > 0 ? "sent" : "failed");
        }

        channel.ack(msg);
    } catch (err) {
        console.log(`${logPrefix} [+] ERROR WHILE HANDLING EVENT: ${err.message}`);
        // If critical error, maybe don't ack to requeue? For now adhering to existing pattern of acking.
        channel.ack(msg);
    }
}

async function main() {
    // consume events
    await mqbroker.consume("notification", "notification.email", emailNotificationHandler, "emailOnlyNotificationsQueue");
}

module.exports = { main, emailNotificationHandler };