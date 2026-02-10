const Activity = require("../../models/activity.model");

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000; // Run every 24 hours

/**
 * Deletes activities older than one month
 */
async function cleanupOldActivities() {
    try {
        const oneMonthAgo = new Date(Date.now() - ONE_MONTH_MS);

        const result = await Activity.deleteMany({
            createdAt: { $lt: oneMonthAgo }
        });

        console.log(`[+] ACTIVITY CLEANUP: Deleted ${result.deletedCount} activities older than ${oneMonthAgo.toISOString()}`);
        
        return result;
    } catch (err) {
        console.error("[-] ACTIVITY CLEANUP ERROR:", err.message);
        throw err;
    }
}

/**
 * Starts the cleanup worker that runs periodically
 */
function startCleanupWorker() {
    console.log("[+] ACTIVITY CLEANUP WORKER STARTED - Running every 24 hours");

    // Run immediately on startup
    cleanupOldActivities();

    // Then run every 24 hours
    setInterval(cleanupOldActivities, CLEANUP_INTERVAL_MS);
}

module.exports = {
    startCleanupWorker,
    cleanupOldActivities
};
