const VS_BASE_PATH = '/vs/api';

module.exports = {
    // Groups
    [`${VS_BASE_PATH}/groups`]: {
        'GET': 'Listed groups',
        'POST': 'Created a group'
    },
    [`${VS_BASE_PATH}/groups/[^/]+/assets`]: { 'POST': 'Added assets to group' },
    [`${VS_BASE_PATH}/groups/[^/]+`]: {
        'GET': 'Viewed a group',
        'PUT': 'Updated a group',
        'DELETE': 'Deleted a group'
    },

    // Assets
    [`${VS_BASE_PATH}/assets`]: {
        'GET': 'Listed assets',
        'POST': 'Created an asset'
    },
    [`${VS_BASE_PATH}/assets/tags`]: { 'GET': 'Listed asset tags' },
    [`${VS_BASE_PATH}/assets/[^/]+/group/[^/]+/add`]: { 'POST': 'Added asset to group' },
    [`${VS_BASE_PATH}/assets/[^/]+/group/[^/]+`]: { 'DELETE': 'Removed asset from group' },
    [`${VS_BASE_PATH}/assets/[^/]+`]: {
        'GET': 'Viewed an asset',
        'PUT': 'Updated an asset',
        'DELETE': 'Deleted an asset'
    },

    // Scans
    [`${VS_BASE_PATH}/scans`]: {
        'GET': 'Listed scans',
        'POST': 'Created a scan'
    },
    [`${VS_BASE_PATH}/scans/[^/]+/start`]: { 'POST': 'Started a scan' },
    [`${VS_BASE_PATH}/scans/[^/]+`]: {
        'GET': 'Viewed a scan',
        'PUT': 'Updated a scan',
        'DELETE': 'Deleted a scan'
    },

    // Scanners
    [`${VS_BASE_PATH}/scanners`]: {
        'GET': 'Listed scanners',
        'POST': 'Created a scanner'
    },
    [`${VS_BASE_PATH}/scanners/register`]: { 'POST': 'Registered a scanner' },
    [`${VS_BASE_PATH}/scanners/[^/]+/configure`]: { 'PATCH': 'Configured a scanner' },
    [`${VS_BASE_PATH}/scanners/[^/]+/heartbeat`]: { 'POST': 'Registered scanner heartbeat' },
    [`${VS_BASE_PATH}/scanners/[^/]+/stop/[^/]+`]: { 'POST': 'Stopped a scan on scanner' },
    [`${VS_BASE_PATH}/scanners/[^/]+`]: {
        'GET': 'Viewed a scanner',
        'PUT': 'Updated a scanner',
        'DELETE': 'Deleted a scanner'
    },

    // Vulnerabilities
    [`${VS_BASE_PATH}/vulns`]: { 'GET': 'Listed vulnerabilities' },
    [`${VS_BASE_PATH}/vulns/sync`]: { 'POST': 'Synced vulnerabilities with VM' },
    [`${VS_BASE_PATH}/vulns/sendToVm`]: { 'POST': 'Sent vulnerabilities to VM' },
    [`${VS_BASE_PATH}/vulns/supression/rules`]: { 'GET': 'Listed suppression rules' },
    [`${VS_BASE_PATH}/vulns/suppress`]: { 'POST': 'Suppressed a vulnerability' },
    [`${VS_BASE_PATH}/vulns/unsuppress`]: { 'POST': 'Unsuppressed a vulnerability' },
    [`${VS_BASE_PATH}/vulns/[^/]+`]: {
        'PUT': 'Updated a vulnerability',
        'DELETE': 'Deleted a vulnerability'
    },

    // Adapters
    [`${VS_BASE_PATH}/adapters`]: {
        'GET': 'Listed installed adapters',
        'POST': 'Installed an adapter'
    },
    [`${VS_BASE_PATH}/adapters/refresh/[^/]+`]: { 'PATCH': 'Refreshed an adapter' },
    [`${VS_BASE_PATH}/adapters/[^/]+`]: { 'DELETE': 'Deleted an adapter' },

    // Config
    [`${VS_BASE_PATH}/config`]: {
        'GET': 'Viewed configuration',
        'POST': 'Created configuration',
        'PUT': 'Updated configuration',
        'DELETE': 'Deleted configuration'
    },

    // Webhooks
    [`${VS_BASE_PATH}/webhook/result/[^/]+`]: { 'POST': 'Received scan result webhook' },

    // Dashboard
    [`${VS_BASE_PATH}/dashboard`]: { 'GET': 'Viewed dashboard' }
};
