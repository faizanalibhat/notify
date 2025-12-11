const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    payload: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model("activity_log", activityLogSchema);
