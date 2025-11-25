const TM_BASE_PATH = '/tm/api';

module.exports = {
    // Dashboard
    [`${TM_BASE_PATH}/dashboard`]: { 'GET': 'Viewed dashboard statistics' },

    // Projects
    [`${TM_BASE_PATH}/projects`]: {
        'GET': 'Listed projects',
        'POST': 'Created a new project'
    },
    [`${TM_BASE_PATH}/projects/[^/]+/stats`]: { 'GET': 'Viewed project statistics' },
    [`${TM_BASE_PATH}/projects/[^/]+`]: {
        'GET': 'Viewed a project',
        'PATCH': 'Updated a project',
        'DELETE': 'Deleted a project'
    },
    [`${TM_BASE_PATH}/projects/[^/]+/collaborators`]: {
        'GET': 'Listed project collaborators',
        'PATCH': 'Added a collaborator to a project'
    },
    [`${TM_BASE_PATH}/projects/[^/]+/collaborators/[^/]+`]: { 'DELETE': 'Removed a collaborator from a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/endpoints`]: { 'GET': 'Listed project endpoints' },
    [`${TM_BASE_PATH}/projects/[^/]+/threats`]: {
        'GET': 'Listed project threats',
        'POST': 'Created a new threat in a project'
    },
    [`${TM_BASE_PATH}/projects/[^/]+/endpoint/[^/]+/threats`]: { 'GET': 'Listed threats for an endpoint in a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/export`]: { 'GET': 'Exported project threats to CSV' },
    [`${TM_BASE_PATH}/projects/[^/]+/threats/flush`]: { 'POST': 'Flushed all threats from a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/threats/refresh`]: { 'POST': 'Refreshed threats for a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/prompt/reset`]: { 'POST': 'Reset the prompt for a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/import/[^/]+`]: { 'POST': 'Imported a collection into a project' },
    [`${TM_BASE_PATH}/projects/[^/]+/threats/import/csv`]: { 'POST': 'Imported threats from a CSV file' },
    [`${TM_BASE_PATH}/projects/[^/]+/default-threat-owner`]: { 'PATCH': 'Set the default threat owner for a project' },

    // Threats
    [`${TM_BASE_PATH}/threats`]: { 'GET': 'Listed all threats' },
    [`${TM_BASE_PATH}/threats/[^/]+`]: {
        'POST': 'Created a new threat for a project',
        'GET': 'Viewed a threat',
        'PATCH': 'Updated a threat',
        'DELETE': 'Deleted a threat'
    },
    [`${TM_BASE_PATH}/threats/update/bulk`]: { 'PATCH': 'Bulk updated threats' },
    [`${TM_BASE_PATH}/threats/[^/]+/comment`]: { 'POST': 'Added a comment to a threat' },
    [`${TM_BASE_PATH}/threats/[^/]+/comment/[^/]+`]: { 'DELETE': 'Deleted a comment from a threat' },

    // Endpoints
    [`${TM_BASE_PATH}/endpoints`]: { 'GET': 'Listed all endpoints' },
    [`${TM_BASE_PATH}/endpoints/[^/]+/threats/generate`]: { 'POST': 'Generated threats for an endpoint' },
    [`${TM_BASE_PATH}/endpoints/[^/]+`]: { 'DELETE': 'Deleted an endpoint' },

    // Prompt
    [`${TM_BASE_PATH}/prompt`]: {
        'GET': 'Viewed the prompt',
        'POST': 'Saved the prompt'
    },

    // Adapters
    [`${TM_BASE_PATH}/adapters/available`]: { 'GET': 'Listed available adapters' },
    [`${TM_BASE_PATH}/adapters/installed`]: { 'GET': 'Listed installed adapters' },
    [`${TM_BASE_PATH}/adapters`]: { 'POST': 'Created a new adapter instance' },
    [`${TM_BASE_PATH}/adapters/sync/all`]: { 'POST': 'Synced all adapter instances' },
    [`${TM_BASE_PATH}/adapters/sync/[^/]+`]: { 'POST': 'Synced a specific adapter instance' },
    [`${TM_BASE_PATH}/adapters/[^/]+`]: { 'DELETE': 'Deleted an adapter instance' },

    // Collections
    [`${TM_BASE_PATH}/collections`]: { 'GET': 'Listed all collections' },
    [`${TM_BASE_PATH}/collections/[^/]+`]: { 'GET': 'Viewed a collection' },
    [`${TM_BASE_PATH}/collections/[^/]+/endpoints`]: { 'GET': 'Listed endpoints for a collection' },
    [`${TM_BASE_PATH}/collections/[^/]+/endpoints/[^/]+`]: { 'GET': 'Viewed a specific endpoint from a collection' },
    [`${TM_BASE_PATH}/collections/[^/]+/threats`]: { 'GET': 'Listed threats for a collection' },
    [`${TM_BASE_PATH}/collections/[^/]+/import/[^/]+`]: { 'POST': 'Imported into a collection' }
};