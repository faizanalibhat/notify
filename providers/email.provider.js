const transporter = require("../channels/email/index")();

/**
 * Interface definition for EmailProvider (Documentation only)
 * interface EmailProvider {
 *   send(payload: {
 *     to: string;
 *     subject: string;
 *     html: string;
 *     text?: string;
 *     trace_id: string;
 *   }): Promise<void>;
 * }
 */

class NodemailerProvider {
    constructor() {
        this.transporter = transporter;
    }

    async send({ to, subject, html, text, trace_id }) {
        const email = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
            text: text || "This email contains HTML content."
        };

        try {
            console.log(`[${trace_id}] [EmailProvider] Sending email to ${to}`);
            await this.transporter.sendMail(email);
            console.log(`[${trace_id}] [EmailProvider] Sent successfully to ${to}`);
        } catch (err) {
            console.error(`[${trace_id}] [EmailProvider] Failed to send to ${to}: ${err.message}`);
            throw err;
        }
    }
}

module.exports = new NodemailerProvider();
