const notificationService = require("../services/notification.service");


const getAllNotifications = async (req, res) => {
    const { page=1, limit=10 } = req.query;

    const filter = {};

    const notifications = await notificationService.getAllNotifications('', filter, page, limit);

    return res.json(notifications);
}



module.exports = { getAllNotifications };