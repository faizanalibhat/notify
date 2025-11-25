const notificationService = require("../services/notification.service");


const getAllNotifications = async (req, res) => {
    const { orgId, email } = req.authenticatedService;

    const { origin, seen, search } = req.query;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if (origin && origin != "all") filter.origin = origin;

    filter['createdBy.email'] = { $ne: email };

    if (seen) filter.seen = seen == 'true';

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    for (let [key, val] of Object.entries(req.query)) {
        if (!['page', 'limit', 'origin', 'seen', 'search'].includes(key)) {

            if (key == 'product') {
                const products = val.split(",").map(p => p.trim());
                filter['origin'] = products.length > 1 ? { $in: products } : products[0];
            }
            else if (key == "email") {
                const emails = val.split(",").map(e => e.trim());
                filter['createdBy.email'] = emails.length > 1 ? { $in: emails } : emails[0];
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