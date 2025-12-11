const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    payload: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// Set a TTL index to automatically expire documents after 30 days (2592000 seconds)
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("activity_log", activityLogSchema);
