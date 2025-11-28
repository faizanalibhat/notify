const OP_BASE_PATH = '/op/api/v1';

module.exports = {
    // Settings
    [`${OP_BASE_PATH}/settings`]: {
        'GET': 'Viewed ASM settings',
        'POST': 'Updated ASM settings'
    },

    // Scans
    [`${OP_BASE_PATH}/scans`]: {
        'GET': 'Listed scans'
    },
    [`${OP_BASE_PATH}/scans/launch-test`]: {
        'POST': 'Launched a test scan'
    },

    // Reports
    [`${OP_BASE_PATH}/reports`]: {
        'GET': 'Listed reports',
        'POST': 'Generated a new report'
    },
    [`${OP_BASE_PATH}/reports/download/[^/]+`]: {
        'GET': 'Downloaded a report'
    },
    [`${OP_BASE_PATH}/reports/preview/[^/]+`]: {
        'GET': 'Previewed a report'
    },
    [`${OP_BASE_PATH}/reports/[^/]+`]: {
        'DELETE': 'Deleted a report'
    },

    // Exposures
    [`${OP_BASE_PATH}/exposures`]: {
        'GET': 'Listed exposures'
    },
    [`${OP_BASE_PATH}/exposures/reason-list/[^/]+`]: {
        'GET': 'Listed exposure reasons'
    },
    [`${OP_BASE_PATH}/exposures/csv`]: {
        'GET': 'Downloaded exposures CSV'
    },
    [`${OP_BASE_PATH}/exposures/sync`]: {
        'POST': 'Synced exposures to VM'
    },
    [`${OP_BASE_PATH}/exposures/[^/]+`]: {
        'PATCH': 'Updated an exposure'
    },

    // Dashboard
    [`${OP_BASE_PATH}/dashboard/main`]: {
        'GET': 'Viewed main dashboard'
    },
    [`${OP_BASE_PATH}/dashboard/roi`]: {
        'GET': 'Viewed ROI dashboard'
    },

    // Rules
    [`${OP_BASE_PATH}/rules/all`]: {
        'POST': 'Triggered all rules'
    },
    [`${OP_BASE_PATH}/rules/sync`]: {
        'POST': 'Synced default rules'
    },
    [`${OP_BASE_PATH}/rules/[^/]+`]: {
        'POST': 'Triggered a specific rule'
    },

    // Assets
    [`${OP_BASE_PATH}/assets`]: {
        'GET': 'Listed assets'
    },
    [`${OP_BASE_PATH}/assets/[^/]+/timeline`]: {
        'GET': 'Viewed asset timeline'
    },
    [`${OP_BASE_PATH}/assets/[^/]+/exposure`]: {
        'POST': 'Updated asset exposure status'
    }
};
