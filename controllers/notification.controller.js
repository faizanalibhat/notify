const notificationService = require("../services/notification.service");


const getAllNotifications = async (req, res) => {
    const { orgId, email } = req.authenticatedService;

    const { page=1, limit=10, origin, seen, search } = req.query;

    const filter = {};

    if (origin && origin != "all") filter.origin = origin;

    filter['createdBy.email'] = { $ne: email };

    if (seen) filter.seen = seen == 'true';

    if (search) {
        filter.title = { $regex: search, $options: 'i' };
        filter.description = { $regex: search, $options: 'i' };
    }

    for (let [key,val] of Object.entries(req.query)) {
        if (!['page', 'limit', 'origin', 'seen', 'search'].includes(key)) {

            if (key == 'product') filter['origin'] = val;
            else if (key == "person") filter['createdBy.email'] = val; 
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

    const markedAsSeen = await notificationService.markAllAsSeen(orgId);

    return res.json({ success: true, message: "success" });
}



module.exports = { getAllNotifications, markNotificationSeen, markAllAsSeen };