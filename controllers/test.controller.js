const templateService = require("../services/template.service");
const { mqbroker } = require("../services/rabbitmq.service");

/**
 * Test all email templates by sending them to a specified email
 */
exports.testAllTemplates = async (req, res) => {
    try {
        // Default email if not provided
        const email = req.query.email || "snaptest.could648@passmail.com";
        const templates = [
            {
                id: "LOGIN_OTP",
                context: {
                    otp: "123456",
                    name: "John Doe",
                    subject: "Your Login OTP"
                }
            },
            {
                id: "REGISTRATION_OTP",
                context: {
                    otp: "654321",
                    name: "John Doe",
                    subject: "Your Registration OTP"
                }
            },
            {
                id: "MAGIC_LINK",
                context: {
                    magicLink: "https://app.snapsec.co/auth/magic-login?token=xyz123",
                    expiryDays: "30",
                    subject: "Your Magic Login Link"
                }
            },
            {
                id: "PASSWORD_RESET",
                context: {
                    resetLink: "https://app.snapsec.co/auth/change-password?token=abc456",
                    expiryHours: "1 hour",
                    subject: "Reset Your Password"
                }
            },
            {
                id: "ORG_INVITATION",
                context: {
                    orgName: "Acme Corp",
                    iniviteLink: "https://app.snapsec.co/auth/invite?token=invite789",
                    expiryHours: "48",
                    subject: "You've been invited to join Acme Corp"
                }
            },
            {
                id: "WELCOME_EMAIL",
                context: {
                    name: "John Doe",
                    subject: "Snapsec Suite: Support & Next Steps"
                }
            },
            {
                id: "GENERIC_EMAIL",
                context: {
                    heading: "Test Generic Notification",
                    body: "This is a test of the generic email template. <br> <strong>Bold text</strong> and normal text.",
                    subject: "Generic Test Email"
                }
            }
        ];

        const results = [];

        for (const tmpl of templates) {
            try {
                // Construct payload similar to what auth service does
                const payload = {
                    event_id: `test-${Date.now()}-${tmpl.id}`,
                    trace_id: `test-trace-${Date.now()}`,
                    template_id: tmpl.id,
                    context: {
                        ...tmpl.context,
                        email: email, // Context often needs email for robohash images etc
                        base_url: "app.snapsec.co"
                    },
                    recievers: [{ email: email }],
                    notification: {
                        title: tmpl.context.subject || "Test Notification",
                        origin: "test",
                        resourceMeta: {
                            product: "test",
                            resource: tmpl.id
                        }
                    },
                    channels: ["email"]
                };

                // Publish to RabbitMQ to test end-to-end
                await mqbroker.publish("notification", "notification.email", payload);
                results.push({ id: tmpl.id, status: "queued", event_id: payload.event_id });

            } catch (err) {
                console.error(`Error sending test for ${tmpl.id}:`, err);
                results.push({ id: tmpl.id, status: "failed", error: err.message });
            }
        }

        return res.status(200).json({
            message: `Test emails queued for ${email}`,
            results
        });

    } catch (error) {
        console.error("Test controller error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
