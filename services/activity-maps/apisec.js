const APISEC_BASE_PATH = '/apisec/api/v1';

module.exports = {
    // Health Check
    [`${APISEC_BASE_PATH}/health`]: { 'GET': 'Performed a health check' },

    // Rules
    [`${APISEC_BASE_PATH}/rule/summary`]: { 'GET': 'Viewed rules summary' },
    [`${APISEC_BASE_PATH}/rule/search`]: { 'GET': 'Searched rules' },
    [`${APISEC_BASE_PATH}/rule`]: {
        'GET': 'Listed rules',
        'POST': 'Created a new rule'
    },
    [`${APISEC_BASE_PATH}/rule/sync/default-rules`]: { 'POST': 'Synced default rules' },
    [`${APISEC_BASE_PATH}/rule/[^/]+/status`]: { 'PATCH': 'Updated rule status' },
    [`${APISEC_BASE_PATH}/rule/[^/]+`]: {
        'GET': 'Viewed a rule',
        'PUT': 'Updated a rule',
        'DELETE': 'Deleted a rule'
    },

    // Integrations
    [`${APISEC_BASE_PATH}/integration`]: {
        'GET': 'Listed integrations',
        'POST': 'Created a new integration'
    },
    [`${APISEC_BASE_PATH}/integration/workspaces`]: { 'POST': 'Fetched Postman workspaces' },
    [`${APISEC_BASE_PATH}/integration/[^/]+/refresh`]: { 'POST': 'Refreshed an integration' },
    [`${APISEC_BASE_PATH}/integration/[^/]+`]: {
        'GET': 'Viewed an integration',
        'PUT': 'Updated an integration',
        'DELETE': 'Deleted an integration'
    },

    // Raw Requests
    [`${APISEC_BASE_PATH}/raw-request/bulk/delete`]: { 'POST': 'Bulk deleted raw requests' },
    [`${APISEC_BASE_PATH}/raw-request`]: {
        'GET': 'Listed raw requests',
        'POST': 'Created a new raw request'
    },
    [`${APISEC_BASE_PATH}/raw-request/[^/]+`]: {
        'GET': 'Viewed a raw request',
        'PUT': 'Updated a raw request',
        'DELETE': 'Deleted a raw request'
    },

    // Scans
    [`${APISEC_BASE_PATH}/scan/flush`]: { 'POST': 'Flushed scans and vulnerabilities' },
    [`${APISEC_BASE_PATH}/scan`]: {
        'GET': 'Listed scans',
        'POST': 'Created a new scan'
    },
    [`${APISEC_BASE_PATH}/scan/[^/]+/rescan`]: { 'POST': 'Initiated a rescan' },
    [`${APISEC_BASE_PATH}/scan/[^/]+/findings`]: { 'GET': 'Viewed scan findings' },
    [`${APISEC_BASE_PATH}/scan/[^/]+/execution`]: { 'POST': 'Updated scan execution status' },
    [`${APISEC_BASE_PATH}/scan/[^/]+`]: {
        'GET': 'Viewed a scan',
        'DELETE': 'Deleted a scan'
    },

    // Vulnerabilities
    [`${APISEC_BASE_PATH}/vulnerability/stats`]: { 'GET': 'Viewed vulnerability statistics' },
    [`${APISEC_BASE_PATH}/vulnerability/export`]: { 'GET': 'Exported vulnerabilities' },
    [`${APISEC_BASE_PATH}/vulnerability`]: { 'GET': 'Listed vulnerabilities' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/details`]: { 'GET': 'Viewed vulnerability details' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/notes`]: { 'POST': 'Added a note to a vulnerability' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/false-positive`]: { 'POST': 'Marked a vulnerability as false positive' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/resolve`]: { 'POST': 'Resolved a vulnerability' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/send-to-vm`]: { 'POST': 'Transferred vulnerability to VM' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/suppress`]: { 'POST': 'Suppressed a vulnerability' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+/unsuppress`]: { 'POST': 'Unsuppressed a vulnerability' },
    [`${APISEC_BASE_PATH}/vulnerability/[^/]+`]: {
        'GET': 'Viewed a vulnerability',
        'PATCH': 'Updated a vulnerability'
    },

    // Dashboard
    [`${APISEC_BASE_PATH}/dashboard`]: { 'GET': 'Viewed dashboard statistics' },

    // Transformed Requests
    [`${APISEC_BASE_PATH}/transformed_requests`]: { 'GET': 'Listed transformed requests' },

    // Raw Environments
    [`${APISEC_BASE_PATH}/raw-environments/bulk/delete`]: { 'POST': 'Bulk deleted raw environments' },
    [`${APISEC_BASE_PATH}/raw-environments/workspace/[^/]+`]: { 'GET': 'Listed raw environments by workspace' },
    [`${APISEC_BASE_PATH}/raw-environments`]: {
        'GET': 'Listed all raw environments',
        'POST': 'Created a new raw environment'
    },
    [`${APISEC_BASE_PATH}/raw-environments/[^/]+/variables`]: { 'POST': 'Added a variable to a raw environment' },
    [`${APISEC_BASE_PATH}/raw-environments/[^/]+/variables/[^/]+`]: {
        'PUT': 'Updated a variable in a raw environment',
        'DELETE': 'Deleted a variable from a raw environment'
    },
    [`${APISEC_BASE_PATH}/raw-environments/[^/]+`]: {
        'GET': 'Viewed a raw environment',
        'PUT': 'Updated a raw environment',
        'DELETE': 'Deleted a raw environment'
    },

    // Collections
    [`${APISEC_BASE_PATH}/collections`]: { 'GET': 'Listed collections' },

    // Config
    [`${APISEC_BASE_PATH}/config`]: {
        'GET': 'Viewed configuration',
        'PUT': 'Updated configuration'
    },

    // Projects
    [`${APISEC_BASE_PATH}/projects`]: {
        'GET': 'Listed projects',
        'POST': 'Created a new project'
    },
    [`${APISEC_BASE_PATH}/projects/[^/]+/dashboard`]: { 'GET': 'Viewed project dashboard' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/collection`]: { 'PATCH': 'Toggled collection status in a project' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/collections/add`]: { 'POST': 'Added a collection to a project' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/collections/remove`]: { 'POST': 'Removed a collection from a project' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/rules`]: {
        'GET': 'Listed project rules',
        'PUT': 'Updated project rules'
    },
    [`${APISEC_BASE_PATH}/projects/[^/]+/rules/effective`]: { 'GET': 'Viewed effective rules for a project' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/browser-requests`]: { 'GET': 'Listed browser requests for a project' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/browser-requests/bulk/[^/]+`]: { 'POST': 'Bulk created browser requests' },
    [`${APISEC_BASE_PATH}/projects/[^/]+/browser-requests/[^/]+`]: {
        'GET': 'Viewed a browser request',
        'POST': 'Created a browser request',
        'PUT': 'Updated a browser request',
        'DELETE': 'Deleted a browser request'
    },
    [`${APISEC_BASE_PATH}/projects/[^/]+`]: {
        'GET': 'Viewed a project',
        'PATCH': 'Updated a project',
        'DELETE': 'Deleted a project'
    },

    // Auth Profiles
    [`${APISEC_BASE_PATH}/auth-profiles`]: {
        'GET': 'Listed authentication profiles',
        'POST': 'Created a new authentication profile'
    },
    [`${APISEC_BASE_PATH}/auth-profiles/[^/]+`]: {
        'GET': 'Viewed an authentication profile',
        'PUT': 'Updated an authentication profile',
        'DELETE': 'Deleted an authentication profile'
    },

    // Swagger Integrations
    [`${APISEC_BASE_PATH}/swagger-integrations/validate-url`]: { 'POST': 'Validated a Swagger URL' },
    [`${APISEC_BASE_PATH}/swagger-integrations`]: {
        'GET': 'Listed Swagger integrations',
        'POST': 'Created a new Swagger integration'
    },
    [`${APISEC_BASE_PATH}/swagger-integrations/[^/]+/refresh`]: { 'POST': 'Refreshed a Swagger integration' },
    [`${APISEC_BASE_PATH}/swagger-integrations/[^/]+`]: {
        'GET': 'Viewed a Swagger integration',
        'PUT': 'Updated a Swagger integration',
        'DELETE': 'Deleted a Swagger integration'
    }
};
