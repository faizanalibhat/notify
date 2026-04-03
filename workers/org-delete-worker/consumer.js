const mongoose = require("mongoose");

// Explicitly register all 5 Notify models
require("../../models/activity.model.js");
require("../../models/activityLog.model.js");
require("../../models/idempotency.model.js");
require("../../models/notifications.model.js");
require("../../models/templates.model.js");

class OrgDeleteConsumer {
    static async handleOrgDeleteEvent(payload, msg, channel) {
        const { orgId } = payload;

        if (!orgId) {
            console.warn("[Org Delete Consumer] Received event without orgId", payload);
            channel.ack(msg);
            return;
        }

        console.log(`[Org Delete Consumer - Notify] Deleting all Notify data for org: ${orgId}`);

        try {
            const targetId = new mongoose.Types.ObjectId(orgId);

            // Verified Model Names from backend/notify/models/
            const modelsToClean = [
                'activity',
                'activityLog',
                'idempotency',
                'notifications',
                'templates',
            ];

            let totalDeleted = 0;

            for (const modelName of modelsToClean) {
                if (mongoose.models[modelName]) {
                    const result = await mongoose.models[modelName].deleteMany({ orgId: targetId });
                    console.log(`[Org Delete Consumer - Notify] Cleared ${result.deletedCount} from ${modelName}`);
                    totalDeleted += result.deletedCount;
                }
            }

            console.log(`[Org Delete Consumer - Notify] Cleanup completed for ${orgId}. Total deleted records: ${totalDeleted}`);
        } catch (err) {
            console.error(`[Org Delete Consumer - Notify] Error during cleanup for org ${orgId}:`, err);
        } finally {
            channel.ack(msg);
        }
    }
}

module.exports = { OrgDeleteConsumer };
