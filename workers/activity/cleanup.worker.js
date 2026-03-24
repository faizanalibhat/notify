const Activity = require("../../models/activity.model");

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000; // Run every 24 hours

/**
 * Deletes activities older than 10 days
 */
async function cleanupOldActivities() {
    try {
        const tenDaysAgo = new Date(Date.now() - TEN_DAYS_MS);

        const result = await Activity.deleteMany({
            createdAt: { $lt: tenDaysAgo }
        });

        console.log(`[+] ACTIVITY CLEANUP: Deleted ${result.deletedCount} activities older than ${tenDaysAgo.toISOString()}`);
        
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
