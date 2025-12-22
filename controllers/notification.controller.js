const notificationService = require("../services/notification.service");
const crypto = require("crypto");


const getPeriodStartDate = (period) => {
    const now = new Date();
    const value = parseInt(period.slice(0, -1));
    const unit = period.slice(-1);

    switch (unit) {
        case 'd': // days
            now.setDate(now.getDate() - value);
            break;
        case 'h': // hours
            now.setHours(now.getHours() - value);
            break;
        case 'm': // months
            now.setMonth(now.getMonth() - value);
            break;
        default:
            return null;
    }

    return now;
}


const getAllNotifications = async (req, res) => {
    const { orgId, email } = req.authenticatedService;

    const { origin, seen, search, period } = req.query;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if (origin && origin != "all") filter.origin = origin;

    // prevent notifications from current user
    // filter['createdBy.email'] = { $ne: email };

    if (seen) filter.seen = seen == 'true';

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    if (period) {
        const validPeriodPattern = /^\d+[dhm]$/;
        if (validPeriodPattern.test(period)) {
            const startDate = getPeriodStartDate(period);
            if (startDate) {
                filter.createdAt = { $gte: startDate };
            }
        }
    }

    for (let [key, val] of Object.entries(req.query)) {
        if (!['page', 'limit', 'origin', 'seen', 'search', 'period'].includes(key)) {

            if (!val) continue;

            if (key == 'product') {
                const products = val.split(",").map(p => p.trim()).filter(p => p);
                if (products.length > 0) {
                    filter['origin'] = products.length > 1 ? { $in: products } : products[0];
                }
            }
            else if (key == "email") {
                const emails = val.split(",").map(e => e.trim()).filter(e => e);
                if (emails.length > 0) {
                    filter['createdBy.email'] = emails.length > 1 ? { $in: emails } : emails[0];
                }
            }
        }
    }

    const notifications = await notificationService.getAllNotifications(orgId, filter, page, limit);

    return res.json(notifications);
}



const markNotificationSeen = async (req, res) => {
    const { orgId } = req.authenticatedService;
    const { id } = req.params;

    const notification = await notificationService.markNotificationSeen(orgId, id);

    return res.json(notification);
}



const markAllAsSeen = async (req, res) => {
    const { orgId } = req.authenticatedService;

    const { origin } = req.body;

    let finalOrigin = origin;

    if (finalOrigin == "all") {
        finalOrigin = null;
    }

    const markedAsSeen = await notificationService.markAllAsSeen(orgId, finalOrigin);

    return res.json({ success: true, message: "success" });
}



const { mqbroker } = require("../services/rabbitmq.service");

const testEmailNotification = async (req, res) => {
    try {
        const { email, template_id } = req.body;

        // Auto-seed template if missing (to ensure test works in all environments)
        const Template = require("../models/templates.model");
        const targetSlug = template_id || "VM_REPORT_CREATED";
        const exists = await Template.findOne({ slug: targetSlug });

        if (!exists) {
            await Template.create({
                slug: targetSlug,
                type: "email",
                raw: "<h1>New VM Report</h1><p>User: {{user_name}}</p><p>Subject: {{subject}}</p>",
                orgId: "test-org",
                status: "active"
            });
            console.log(`[Test] Auto-seeded template: ${targetSlug}`);
        }

        // Canonical payload structure
        const payload = {
            event_id: crypto.randomUUID(),
            trace_id: "test-trace-" + Date.now(),
            slug: "global",
            store: false,
            orgId: "test-org",
            channels: ["email"],
            template_id: targetSlug,
            notification: {
                origin: "test",
                resourceMeta: { resource: "test" }
            },
            context: {
                user_name: "Test User",
                subject: "Test Notification",
                title: "Test Title",
                description: "This is a test notification",
                timestamp: new Date().toISOString()
            },
            recievers: [{ email: email || "test@example.com" }],
            authContext: {
                user_id: "test-user-id",
                email: email || "test@example.com",
                locale: "en"
            }
        };

        await mqbroker.publish("notification", "notification.email", payload);

        return res.json({
            success: true,
            message: "Test event published (template verified/seeded)",
            event_id: payload.event_id,
            trace_id: payload.trace_id,
            template_id: targetSlug
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { getAllNotifications, markNotificationSeen, markAllAsSeen, testEmailNotification };