const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: String,
    email: String,
    avatar: String,
    type: { type: String, default: "user" }
}, { _id: false });

const targetSchema = new mongoose.Schema({
    id: { type: String },
    type: { type: String },
    title: { type: String },
    url: { type: String }
}, { _id: false });

const resourceMeta = new mongoose.Schema({
    product: { type: String },
    resource: { type: String },
    action: { type: String },
}, { _id: false, strict: false });

const notificationSchema = new mongoose.Schema({
    orgId: { type: String },
    userIds: { type: [String], index: true },
    type: { type: String },
    title: { type: String },
    title_html: { type: String },
    description: { type: String },
    origin: { type: String, required: true },
    seen: { type: Boolean, default: false }, // Keeping for backward compatibility or single-user docs
    seenBy: { type: [String], default: [], index: true },
    resourceUrl: { type: String },
    actor: { type: actorSchema },
    target: { type: targetSchema },
    event_key: { type: String },
    ui_context: { type: mongoose.Schema.Types.Mixed },
    resourceMeta: { type: resourceMeta },
}, { timestamps: true, strict: false });

module.exports = mongoose.model("notifications", notificationSchema);