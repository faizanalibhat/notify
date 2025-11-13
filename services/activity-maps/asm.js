const OP_BASE_PATH = '/op/api/v1';

module.exports = {
    // Settings
    [`${OP_BASE_PATH}/settings`]: {
        'GET': 'Viewed ASM settings',
        'POST': 'Updated ASM settings'
    },

    // Scans
    [`${OP_BASE_PATH}/scans`]: {
        'GET': 'Listed scans in ASM'
    },
    [`${OP_BASE_PATH}/scans/launch-test`]: {
        'POST': 'Launched a new test scan in ASM'
    },

    // Reports
    [`${OP_BASE_PATH}/reports`]: {
        'GET': 'Listed reports in ASM',
        'POST': 'Generated a new report in ASM'
    },
    [`${OP_BASE_PATH}/reports/download/[^/]+`]: {
        'GET': 'Downloaded a report from ASM'
    },
    [`${OP_BASE_PATH}/reports/preview/[^/]+`]: {
        'GET': 'Previewed a report in ASM'
    },
    [`${OP_BASE_PATH}/reports/[^/]+`]: {
        'DELETE': 'Deleted a report in ASM'
    },

    // Exposures
    [`${OP_BASE_PATH}/exposures`]: {
        'GET': 'Listed exposures in ASM'
    },
    [`${OP_BASE_PATH}/exposures/sync`]: {
        'POST': 'Synced exposures to an external system from ASM'
    },
    [`${OP_BASE_PATH}/exposures/[^/]+`]: {
        'PATCH': 'Updated an exposure in ASM'
    },

    // Dashboard
    [`${OP_BASE_PATH}/dashboard/main`]: {
        'GET': 'Viewed the main ASM dashboard'
    },
    [`${OP_BASE_PATH}/dashboard/roi`]: {
        'GET': 'Viewed the ROI ASM dashboard'
    },

    // Rules
    [`${OP_BASE_PATH}/rules/all`]: {
        'POST': 'Triggered all rules in ASM'
    },
    [`${OP_BASE_PATH}/rules/[^/]+`]: {
        'POST': 'Triggered a specific rule in ASM'
    },

    // Assets
    [`${OP_BASE_PATH}/assets`]: {
        'GET': 'Listed assets in ASM'
    },
    [`${OP_BASE_PATH}/assets/[^/]+/timeline`]: {
        'GET': 'Viewed asset timeline in ASM'
    },
    [`${OP_BASE_PATH}/assets/[^/]+/exposure`]: {
        'POST': 'Updated asset exposure status in ASM'
    }
};
