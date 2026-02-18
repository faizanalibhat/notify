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
                    year: new Date().getFullYear()
                }
            },
            {
                id: "REGISTRATION_OTP",
                context: {
                    otp: "654321",
                    year: new Date().getFullYear()
                }
            },
            {
                id: "VULN_ASSIGNED_NOTIFICATION",
                context: {
                    assignee: { name: "Jane Doe", userId: "123" },
                    vuln: {
                        title: "SQL Injection in Login Page",
                        orgId: "VULN-2023-001",
                        severity: "Critical"
                    },
                    action_url: "https://suite.snapsec.co/vuln/123",
                    year: new Date().getFullYear()
                }
            },
            {
                id: "SLA_BREACH_NOTIFICATION",
                context: {
                    daysOverdue: 5,
                    vuln: {
                        title: "XSS in Search Bar",
                        orgId: "VULN-2023-002",
                        severity: "High",
                        state: "Open"
                    },
                    deadline: "2023-10-25",
                    action_url: "https://suite.snapsec.co/vuln/456",
                    year: new Date().getFullYear()
                }
            },
            {
                id: "WEEKLY_TICKET_REMINDER",
                context: {
                    stats: {
                        totalOpen: 15,
                        critical: 3,
                        high: 5,
                        medium: 7
                    },
                    year: new Date().getFullYear()
                }
            },
            {
                id: "WEEKLY_LEAD_SUMMARY",
                context: {
                    stats: {
                        resolutionRate: 85,
                        resolved: 45,
                        pending: 12,
                        newIssues: 5
                    },
                    year: new Date().getFullYear()
                }
            }
        ];

        const results = [];

        for (const tmpl of templates) {
            try {
                // Construct payload similar to what workers do
                const payload = {
                    orgId: "TEST_ORG",
                    TEMPLATE_ID: tmpl.id,
                    context: tmpl.context,
                    recievers: [{ email: email }]
                };

                // Directly use the logic that routes to email provider
                // We can publish to RabbitMQ to test end-to-end, or call service directly.
                // Publishing to RabbitMQ mimics real flow best.

                await mqbroker.publish("notification", "notification.email", payload);
                results.push({ id: tmpl.id, status: "queued" });

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
