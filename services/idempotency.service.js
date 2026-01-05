const Idempotency = require("../models/idempotency.model");

/**
 * Checks if an event has already been processed for a specific channel.
 * If not, records it as 'processing'.
 * @param {string} eventId 
 * @param {string} channel 
 * @returns {Promise<boolean>} true if already exists, false if new (and recorded)
 */
const checkAndRecord = async (eventId, channel) => {
    try {
        await Idempotency.create({
            event_id: eventId,
            channel: channel,
            status: "processing",
            processed_at: new Date()
        });
        return false; // Did not exist, now created
    } catch (err) {
        if (err.code === 11000) {
            return true; // Already exists (duplicate)
        }
        throw err;
    }
};

/**
 * Updates the status of an idempotency record.
 * @param {string} eventId 
 * @param {string} channel 
 * @param {"sent"|"failed"} status 
 */
const updateStatus = async (eventId, channel, status) => {
    await Idempotency.updateOne(
        { event_id: eventId, channel: channel },
        { $set: { status: status, processed_at: new Date() } }
    );
};

module.exports = {
    checkAndRecord,
    updateStatus
};
