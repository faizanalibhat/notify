const Notification = require("../models/notifications.model");
const { ObjectId } = require("mongoose").Types;


const createNotification = async (orgId, notification) => {
    try {
        const created = await Notification.create({ orgId, ...notification });

        return created;
    }
    catch(err) {
        console.log("[+] ERROR WHILE CREATING NOTIFICATION ", err.message);

        return { code: 500, status: "failed", message: "failed to create notification" };
    }
}


const getAllNotifications = async (orgId, filter={}, page=1, limit=10) => {

    const notifications = await Notification.find({ orgId, ...filter }).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).lean();

    const total = await Notification.countDocuments({ orgId, 'createdBy.email': filter['createdBy.email'] });

    const unseen = await Notification.countDocuments({ orgId, seen: false, 'createdBy.email': filter['createdBy.email'] });

    return { notifications, total, unseen };
}


const markNotificationSeen = async (orgId, notificationId) => {
    try {
        const updated = await Notification.findOneAndUpdate({ orgId, _id: ObjectId.createFromHexString(notificationId) }, { $set: { seen: true } }, { new: true });

        if (!updated) return { code: 404, status: "failed", message: "notification not found" };

        return updated;
    }
    catch(err) {
        console.log("[+] ERROR WHILE CREATING NOTIFICATION ", err.message);

        return { code: 500, status: "failed", message: "failed to create notification" };
    }
}



const markAllAsSeen = async (orgId, origin) => {
    try {
        const updated = await Notification.updateMany({ orgId, ...(origin ? { origin } : {}) }, { $set: { seen: true } }, { new: true });

        return updated;
    }
    catch(error) {
        console.log("[+] FAILED TO MARK AS SEEN");
        return { code: 500, status: "failed", message: "all marked as seen" };
    }
}


module.exports = {
    createNotification,
    getAllNotifications,
    markNotificationSeen,
    markAllAsSeen
}