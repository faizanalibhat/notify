const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId: String
}, { _id: false });



const notificationSchema = new mongoose.Schema({
    orgId: { type: String, },
    type: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    seen: { type: Boolean, default: false },
    seenBy: { type: [String], default: [] },
    resourceUrl: { type: String },
    user: { type: userSchema },
}, { timestamps: true, strict: false });


module.exports = mongoose.model("notifications", notificationSchema);