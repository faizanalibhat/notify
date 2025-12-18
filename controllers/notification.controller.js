const notificationService = require("../services/notification.service");


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



module.exports = { getAllNotifications, markNotificationSeen, markAllAsSeen };