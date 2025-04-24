const Notification = require("../models/notifications.model");



const createNotification = async (orgId, notification) => {
    try {
        const created = await Notification.create(notification);

        return created;
    }
    catch(err) {
        console.log("[+] ERROR WHILE CREATING NOTIFICATION ", err.message);

        return { code: 500, status: "failed", message: "failed to create notification" };
    }
}


const getAllNotifications = async (orgId, filter={}, page=1, limit=10) => {

    const notifications = await Notification.find(filter).skip((page-1)*limit).limit(limit).lean();

    const total = await Notification.countDocuments({});

    return { notifications, total };
}


module.exports = {
    createNotification,
    getAllNotifications
}