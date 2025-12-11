const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    // We will store the entire raw payload here. 
    // Using strict: false allows us to save any fields present in the payload.
}, { timestamps: true, strict: false });

// Set a TTL index to automatically expire documents after 30 days (2592000 seconds)
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("activity_log", activityLogSchema);
