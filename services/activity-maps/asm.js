module.exports = {
    // Settings
    '/op/api/v1/settings': {
        'GET': 'Viewed ASM settings',
        'POST': 'Updated ASM settings'
    },

    // Scans
    '/op/api/v1/scans': {
        'GET': 'Listed scans in ASM'
    },
    '/op/api/v1/scans/launch-test': {
        'POST': 'Launched a new test scan in ASM'
    },

    // Reports
    '/op/api/v1/reports': {
        'GET': 'Listed reports in ASM',
        'POST': 'Generated a new report in ASM'
    },
    '/op/api/v1/reports/download/[^/]+': {
        'GET': 'Downloaded a report from ASM'
    },
    '/op/api/v1/reports/preview/[^/]+': {
        'GET': 'Previewed a report in ASM'
    },
    '/op/api/v1/reports/[^/]+': {
        'DELETE': 'Deleted a report in ASM'
    },

    // Exposures
    '/op/api/v1/exposures': {
        'GET': 'Listed exposures in ASM'
    },
    '/op/api/v1/exposures/sync': {
        'POST': 'Synced exposures to an external system from ASM'
    },
    '/op/api/v1/exposures/[^/]+': {
        'PATCH': 'Updated an exposure in ASM'
    },

    // Dashboard
    '/op/api/v1/dashboard/main': {
        'GET': 'Viewed the main ASM dashboard'
    },
    '/op/api/v1/dashboard/roi': {
        'GET': 'Viewed the ROI ASM dashboard'
    },

    // Rules
    '/op/api/v1/rules/all': {
        'POST': 'Triggered all rules in ASM'
    },
    '/op/api/v1/rules/[^/]+': {
        'POST': 'Triggered a specific rule in ASM'
    },

    // Assets
    '/op/api/v1/assets': {
        'GET': 'Listed assets in ASM'
    },
    '/op/api/v1/assets/[^/]+/timeline': {
        'GET': 'Viewed asset timeline in ASM'
    },
    '/op/api/v1/assets/[^/]+/exposure': {
        'POST': 'Updated asset exposure status in ASM'
    }
};
