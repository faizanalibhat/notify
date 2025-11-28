const AIM_BASE_PATH = '/aim/';

module.exports = {
    // Assets
    [`${AIM_BASE_PATH}/assets`]: {
        'GET': 'Listed assets',
        'POST': 'Created a new asset'
    },
    [`${AIM_BASE_PATH}/assets/bulk/create`]: { 'POST': 'Bulk created assets' },
    [`${AIM_BASE_PATH}/assets/bulk/update`]: { 'PUT': 'Bulk updated assets' },
    [`${AIM_BASE_PATH}/assets/bulk/delete`]: { 'DELETE': 'Bulk deleted assets' },
    [`${AIM_BASE_PATH}/assets/import/csv`]: { 'POST': 'Imported assets from CSV' },
    [`${AIM_BASE_PATH}/assets/byValue`]: { 'GET': 'Searched assets by value' },
    [`${AIM_BASE_PATH}/assets/static/[^/]+`]: {
        'GET': 'Viewed asset by static key',
        'PUT': 'Updated asset by static key'
    },
    [`${AIM_BASE_PATH}/assets/[^/]+`]: {
        'GET': 'Viewed an asset',
        'PUT': 'Updated an asset',
        'DELETE': 'Deleted an asset'
    },
    [`${AIM_BASE_PATH}/assets/[^/]+/comments/[^/]+`]: { 'DELETE': 'Deleted an asset comment' },

    // Asset Groups
    [`${AIM_BASE_PATH}/asset-groups`]: {
        'GET': 'Listed asset groups',
        'POST': 'Created a new asset group'
    },
    [`${AIM_BASE_PATH}/asset-groups/search/by-tag`]: { 'GET': 'Searched asset groups by tag' },
    [`${AIM_BASE_PATH}/asset-groups/tags/all`]: { 'GET': 'Listed all asset group tags' },
    [`${AIM_BASE_PATH}/asset-groups/[^/]+/assets`]: {
        'GET': 'Listed assets in a group',
        'POST': 'Added assets to a group'
    },
    [`${AIM_BASE_PATH}/asset-groups/[^/]+/assets/[^/]+`]: { 'DELETE': 'Removed an asset from a group' },
    [`${AIM_BASE_PATH}/asset-groups/[^/]+`]: {
        'GET': 'Viewed an asset group',
        'PUT': 'Updated an asset group',
        'DELETE': 'Deleted an asset group'
    },

    // Asset Relations
    [`${AIM_BASE_PATH}/asset-relations`]: {
        'POST': 'Created an asset relation',
        'DELETE': 'Removed an asset relation'
    },
    [`${AIM_BASE_PATH}/asset-relations/possible`]: { 'GET': 'Listed possible asset relations' },

    // Integrations
    [`${AIM_BASE_PATH}/integrate/[^/]+`]: { 'POST': 'Integrated a new adapter' },
    [`${AIM_BASE_PATH}/integrations/active`]: { 'GET': 'Listed active integrations' },
    [`${AIM_BASE_PATH}/integrations/logs`]: { 'GET': 'Viewed integration logs' },
    [`${AIM_BASE_PATH}/integrations/refresh/[^/]+`]: { 'GET': 'Refreshed an integration' },
    [`${AIM_BASE_PATH}/integrations/[^/]+`]: { 'DELETE': 'Deleted an integration' },

    // Default Values
    [`${AIM_BASE_PATH}/default`]: {
        'GET': 'Listed default values',
        'POST': 'Created a new default value'
    },
    [`${AIM_BASE_PATH}/default/[^/]+`]: {
        'GET': 'Viewed a default value',
        'PUT': 'Updated a default value',
        'DELETE': 'Deleted a default value'
    },

    // Exports
    [`${AIM_BASE_PATH}/export/types`]: { 'GET': 'Listed export types' },
    [`${AIM_BASE_PATH}/export/generate`]: { 'POST': 'Generated an export' },
    [`${AIM_BASE_PATH}/exports`]: { 'GET': 'Listed exports' },
    [`${AIM_BASE_PATH}/exports/all`]: { 'GET': 'Downloaded all exports' },
    [`${AIM_BASE_PATH}/exports/[^/]+/download`]: { 'GET': 'Downloaded an export' },
    [`${AIM_BASE_PATH}/exports/[^/]+`]: { 'DELETE': 'Deleted an export' },

    // Dashboard & Stats
    [`${AIM_BASE_PATH}/dashboard`]: { 'GET': 'Viewed AIM dashboard' },
    [`${AIM_BASE_PATH}/assets/stats/[^/]+`]: { 'GET': 'Viewed asset statistics' },
    [`${AIM_BASE_PATH}/technologies`]: { 'GET': 'Listed technologies' },
    [`${AIM_BASE_PATH}/activites`]: { 'GET': 'Viewed asset activities' },

    // Risk
    [`${AIM_BASE_PATH}/risk`]: {
        'GET': 'Listed risks',
        'POST': 'Created a manual risk'
    },
    [`${AIM_BASE_PATH}/risk/refresh`]: { 'POST': 'Refreshed risks' },
    [`${AIM_BASE_PATH}/risk/csv-report`]: { 'GET': 'Downloaded risk CSV report' },
    [`${AIM_BASE_PATH}/risk/generate/[^/]+`]: { 'POST': 'Generated risk by rule' },
    [`${AIM_BASE_PATH}/risk/[^/]+`]: { 'PUT': 'Updated a risk' },

    // Custom Risk
    [`${AIM_BASE_PATH}/custom/risk`]: {
        'GET': 'Viewed custom risk settings',
        'POST': 'Updated custom risk settings'
    },

    // Classifier
    [`${AIM_BASE_PATH}/classifier`]: { 'POST': 'Ran classifier' },

    // Public Assets
    [`${AIM_BASE_PATH}/public/assets/[^/]+`]: { 'GET': 'Viewed public assets' },
    [`${AIM_BASE_PATH}/public/assets/[^/]+/[^/]+`]: {
        'GET': 'Viewed a public asset',
        'PUT': 'Updated a public asset'
    }
};
