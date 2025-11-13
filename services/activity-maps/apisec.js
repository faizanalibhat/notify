module.exports = {
    // Health Check
    '/apisec/api/v1/health': { 'GET': 'Performed a health check' },

    // Rules
    '/apisec/api/v1/rule/summary': { 'GET': 'Viewed rules summary' },
    '/apisec/api/v1/rule/search': { 'GET': 'Searched rules' },
    '/apisec/api/v1/rule': {
        'GET': 'Listed rules',
        'POST': 'Created a new rule'
    },
    '/apisec/api/v1/rule/sync/default-rules': { 'POST': 'Synced default rules' },
    '/apisec/api/v1/rule/[^/]+/status': { 'PATCH': 'Updated rule status' },
    '/apisec/api/v1/rule/[^/]+': {
        'GET': 'Viewed a rule',
        'PUT': 'Updated a rule',
        'DELETE': 'Deleted a rule'
    },

    // Integrations
    '/apisec/api/v1/integration': {
        'GET': 'Listed integrations',
        'POST': 'Created a new integration'
    },
    '/apisec/api/v1/integration/workspaces': { 'POST': 'Fetched Postman workspaces' },
    '/apisec/api/v1/integration/[^/]+/refresh': { 'POST': 'Refreshed an integration' },
    '/apisec/api/v1/integration/[^/]+': {
        'GET': 'Viewed an integration',
        'PUT': 'Updated an integration',
        'DELETE': 'Deleted an integration'
    },

    // Raw Requests
    '/apisec/api/v1/raw-request/bulk/delete': { 'POST': 'Bulk deleted raw requests' },
    '/apisec/api/v1/raw-request': {
        'GET': 'Listed raw requests',
        'POST': 'Created a new raw request'
    },
    '/apisec/api/v1/raw-request/[^/]+': {
        'GET': 'Viewed a raw request',
        'PUT': 'Updated a raw request',
        'DELETE': 'Deleted a raw request'
    },

    // Scans
    '/apisec/api/v1/scan/flush': { 'POST': 'Flushed scans and vulnerabilities' },
    '/apisec/api/v1/scan': {
        'GET': 'Listed scans',
        'POST': 'Created a new scan'
    },
    '/apisec/api/v1/scan/[^/]+/rescan': { 'POST': 'Initiated a rescan' },
    '/apisec/api/v1/scan/[^/]+/findings': { 'GET': 'Viewed scan findings' },
    '/apisec/api/v1/scan/[^/]+/execution': { 'POST': 'Updated scan execution status' },
    '/apisec/api/v1/scan/[^/]+': {
        'GET': 'Viewed a scan',
        'DELETE': 'Deleted a scan'
    },

    // Vulnerabilities
    '/apisec/api/v1/vulnerability/stats': { 'GET': 'Viewed vulnerability statistics' },
    '/apisec/api/v1/vulnerability/export': { 'GET': 'Exported vulnerabilities' },
    '/apisec/api/v1/vulnerability': { 'GET': 'Listed vulnerabilities' },
    '/apisec/api/v1/vulnerability/[^/]+/details': { 'GET': 'Viewed vulnerability details' },
    '/apisec/api/v1/vulnerability/[^/]+/notes': { 'POST': 'Added a note to a vulnerability' },
    '/apisec/api/v1/vulnerability/[^/]+/false-positive': { 'POST': 'Marked a vulnerability as false positive' },
    '/apisec/api/v1/vulnerability/[^/]+/resolve': { 'POST': 'Resolved a vulnerability' },
    '/apisec/api/v1/vulnerability/[^/]+/send-to-vm': { 'POST': 'Transferred vulnerability to VM' },
    '/apisec/api/v1/vulnerability/[^/]+/suppress': { 'POST': 'Suppressed a vulnerability' },
    '/apisec/api/v1/vulnerability/[^/]+/unsuppress': { 'POST': 'Unsuppressed a vulnerability' },
    '/apisec/api/v1/vulnerability/[^/]+': {
        'GET': 'Viewed a vulnerability',
        'PATCH': 'Updated a vulnerability'
    },

    // Dashboard
    '/apisec/api/v1/dashboard': { 'GET': 'Viewed dashboard statistics' },

    // Transformed Requests
    '/apisec/api/v1/transformed_requests': { 'GET': 'Listed transformed requests' },

    // Raw Environments
    '/apisec/api/v1/raw-environments/bulk/delete': { 'POST': 'Bulk deleted raw environments' },
    '/apisec/api/v1/raw-environments/workspace/[^/]+': { 'GET': 'Listed raw environments by workspace' },
    '/apisec/api/v1/raw-environments': {
        'GET': 'Listed all raw environments',
        'POST': 'Created a new raw environment'
    },
    '/apisec/api/v1/raw-environments/[^/]+/variables': { 'POST': 'Added a variable to a raw environment' },
    '/apisec/api/v1/raw-environments/[^/]+/variables/[^/]+': {
        'PUT': 'Updated a variable in a raw environment',
        'DELETE': 'Deleted a variable from a raw environment'
    },
    '/apisec/api/v1/raw-environments/[^/]+': {
        'GET': 'Viewed a raw environment',
        'PUT': 'Updated a raw environment',
        'DELETE': 'Deleted a raw environment'
    },

    // Collections
    '/apisec/api/v1/collections': { 'GET': 'Listed collections' },

    // Config
    '/apisec/api/v1/config': {
        'GET': 'Viewed configuration',
        'PUT': 'Updated configuration'
    },

    // Projects
    '/apisec/api/v1/projects': {
        'GET': 'Listed projects',
        'POST': 'Created a new project'
    },
    '/apisec/api/v1/projects/[^/]+/dashboard': { 'GET': 'Viewed project dashboard' },
    '/apisec/api/v1/projects/[^/]+/collection': { 'PATCH': 'Toggled collection status in a project' },
    '/apisec/api/v1/projects/[^/]+/collections/add': { 'POST': 'Added a collection to a project' },
    '/apisec/api/v1/projects/[^/]+/collections/remove': { 'POST': 'Removed a collection from a project' },
    '/apisec/api/v1/projects/[^/]+/rules': {
        'GET': 'Listed project rules',
        'PUT': 'Updated project rules'
    },
    '/apisec/api/v1/projects/[^/]+/rules/effective': { 'GET': 'Viewed effective rules for a project' },
    '/apisec/api/v1/projects/[^/]+/browser-requests': { 'GET': 'Listed browser requests for a project' },
    '/apisec/api/v1/projects/[^/]+/browser-requests/bulk/[^/]+': { 'POST': 'Bulk created browser requests' },
    '/apisec/api/v1/projects/[^/]+/browser-requests/[^/]+': {
        'GET': 'Viewed a browser request',
        'POST': 'Created a browser request',
        'PUT': 'Updated a browser request',
        'DELETE': 'Deleted a browser request'
    },
    '/apisec/api/v1/projects/[^/]+': {
        'GET': 'Viewed a project',
        'PATCH': 'Updated a project',
        'DELETE': 'Deleted a project'
    },

    // Auth Profiles
    '/apisec/api/v1/auth-profiles': {
        'GET': 'Listed authentication profiles',
        'POST': 'Created a new authentication profile'
    },
    '/apisec/api/v1/auth-profiles/[^/]+': {
        'GET': 'Viewed an authentication profile',
        'PUT': 'Updated an authentication profile',
        'DELETE': 'Deleted an authentication profile'
    },

    // Swagger Integrations
    '/apisec/api/v1/swagger-integrations/validate-url': { 'POST': 'Validated a Swagger URL' },
    '/apisec/api/v1/swagger-integrations': {
        'GET': 'Listed Swagger integrations',
        'POST': 'Created a new Swagger integration'
    },
    '/apisec/api/v1/swagger-integrations/[^/]+/refresh': { 'POST': 'Refreshed a Swagger integration' },
    '/apisec/api/v1/swagger-integrations/[^/]+': {
        'GET': 'Viewed a Swagger integration',
        'PUT': 'Updated a Swagger integration',
        'DELETE': 'Deleted a Swagger integration'
    }
};
