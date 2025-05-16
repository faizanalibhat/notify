const notificationService = require("../services/notification.service");


const getAllNotifications = async (req, res) => {
    const { orgId, email } = req.authenticatedService;

    const { page=1, limit=10, origin } = req.query;

    const filter = {};

    if (origin && origin != "all") filter.origin = origin;

    filter['createdBy.email'] = email;

    const notifications = await notificationService.getAllNotifications(orgId, filter, page, limit);

    return res.json(notifications);
}



const markNotificationSeen = async (req, res) => {
    const { orgId } = req.authenticatedService;
    const { id } = req.params;

    const notification = await notificationService.markNotificationSeen(orgId, id);

    return res.json(notification);
}



module.exports = { getAllNotifications, markNotificationSeen };