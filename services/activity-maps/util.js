const UTIL_BASE_PATH = '/v1';

module.exports = {
    // Top level routes in app.js
    '/define': { 'GET': 'Requested definition (Legacy)' },
    '/screenshot': { 'GET': 'Requested screenshot (Legacy)' },

    // Engine Routes
    [`${UTIL_BASE_PATH}/engine/rules`]: {
        'GET': 'Listed engine rules',
        'POST': 'Created engine rule'
    },
    [`${UTIL_BASE_PATH}/engine/rules/internal/[^/]+`]: { 'GET': 'Listed engine rules (Internal)' },
    [`${UTIL_BASE_PATH}/engine/rule/[^/]+`]: {
        'GET': 'Viewed engine rule',
        'PATCH': 'Updated engine rule',
        'DELETE': 'Deleted engine rule'
    },
    [`${UTIL_BASE_PATH}/engine/rule/[^/]+/priority`]: { 'PATCH': 'Changed engine rule priority' },
    [`${UTIL_BASE_PATH}/engine/rule/[^/]+/eval`]: { 'GET': 'Evaluated engine rule' },
    [`${UTIL_BASE_PATH}/engine/rule/[^/]+/eval/internal/[^/]+`]: { 'GET': 'Evaluated engine rule (Internal)' },

    // News Routes
    [`${UTIL_BASE_PATH}/news`]: { 'POST': 'Fetched news' },

    // Scan Routes
    [`${UTIL_BASE_PATH}/scan`]: { 'POST': 'Scanned technology' },

    // Definitions Routes
    [`${UTIL_BASE_PATH}/define/define`]: { 'GET': 'Requested definition' },

    // Screenshot Routes
    [`${UTIL_BASE_PATH}/screenshot/screenshot`]: { 'GET': 'Requested screenshot' },
};
