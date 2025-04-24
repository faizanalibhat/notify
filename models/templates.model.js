const mongoose = require("mongoose");


const TEMPLATE_TYPES = ["email", "slack", "whatsapp"];


const templateSchema = new mongoose.Schema({
    orgId: { type: String },
    type: { type: String, enum: TEMPLATE_TYPES, required: true },
    slug: { type: String, required: true, unique: true },
    raw: { type: String, required: true },
}, { timestamps: true, strict: false });



const model = mongoose.model("templates", templateSchema);

module.exports = model;