const mongoose = require("mongoose");

const idempotencySchema = new mongoose.Schema({
    event_id: { type: String, required: true, index: true },
    channel: { type: String, required: true },
    status: { type: String, enum: ["sent", "failed", "processing"], default: "processing" },
    processed_at: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound index for unique event + channel
idempotencySchema.index({ event_id: 1, channel: 1 }, { unique: true });

// TTL index to automatically expire records after 48 hours
idempotencySchema.index({ processed_at: 1 }, { expireAfterSeconds: 172800 });

module.exports = mongoose.model("Idempotency", idempotencySchema);
