const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId: String
}, { _id: false });



const resourceMeta = new mongoose.Schema({
    product: { type: String },
    resource: { type: String },
    action: { type: String },
}, { _id: false, strict: false });


const notificationSchema = new mongoose.Schema({
    orgId: { type: String, },
    type: { type: String },
    title: { type: String, required: true },
    title_html: { type: String },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    seen: { type: Boolean, default: false },
    seenBy: { type: [String], default: [] },
    resourceUrl: { type: String },
    createdBy: { type: userSchema },
    event_key: { type: String },
    ui_context: { type: mongoose.Schema.Types.Mixed },
    resourceMeta: { type: resourceMeta },
    sentTo: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true, strict: false });


module.exports = mongoose.model("notifications", notificationSchema);