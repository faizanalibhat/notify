const { mqbroker } = require("../../services/rabbitmq.service");
const { OrgDeleteConsumer } = require("./consumer");

// Import all models to ensure they are registered with mongoose
require("../../models/activity.model");
require("../../models/notifications.model");
require("../../models/templates.model");

async function startOrgDeleteWorker() {
    await mqbroker.consume(
        "auth.exchange",
        "org.delete",
        OrgDeleteConsumer.handleOrgDeleteEvent,
        "notifyOrgDeleteQueue"
    );
    console.log("[Worker Loaded] Notify Org Delete Worker started listening on org.delete route.");
}

module.exports = startOrgDeleteWorker;
