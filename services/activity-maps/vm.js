const VM_BASE_PATH = '/vm/api';

module.exports = {
    // Assessments
    [`${VM_BASE_PATH}/assessments`]: {
        'GET': 'Listed assessments',
        'POST': 'Created a new assessment'
    },
    [`${VM_BASE_PATH}/assessments/list`]: { 'GET': 'Listed assessments (API)' },
    [`${VM_BASE_PATH}/assessments/dashboard`]: { 'GET': 'Viewed assessments dashboard' },
    [`${VM_BASE_PATH}/assessments/change-request`]: { 'POST': 'Created a change request' },
    [`${VM_BASE_PATH}/assessments/change-requests`]: { 'GET': 'Listed change requests' },
    [`${VM_BASE_PATH}/assessments/change-requests/dashboard`]: { 'GET': 'Viewed change requests dashboard' },
    [`${VM_BASE_PATH}/assessments/clap`]: { 'POST': 'Sent a clap' },
    [`${VM_BASE_PATH}/assessments/assets`]: { 'GET': 'Viewed assessment assets' },
    [`${VM_BASE_PATH}/assessments/org-revalidation-report`]: { 'GET': 'Downloaded org revalidation report' },
    [`${VM_BASE_PATH}/assessments/assessmentReview`]: { 'POST': 'Locked assessment for review' },
    [`${VM_BASE_PATH}/assessments/lock/[^/]+`]: { 'POST': 'Locked an assessment' },
    [`${VM_BASE_PATH}/assessments/assessmentApprove`]: { 'POST': 'Approved an assessment' },
    [`${VM_BASE_PATH}/assessments/collaborators/add`]: { 'POST': 'Added collaborator to assessment' },
    [`${VM_BASE_PATH}/assessments/report/generate-report/[^/]+`]: {
        'POST': 'Generated assessment report',
        'GET': 'Generated assessment data'
    },
    [`${VM_BASE_PATH}/assessments/report/generate-exec/[^/]+`]: {
        'POST': 'Generated executive report',
        'GET': 'Generated executive data'
    },
    [`${VM_BASE_PATH}/assessments/report/full-exec/generate`]: { 'GET': 'Generated full executive report' },
    [`${VM_BASE_PATH}/assessments/report/generate-asset/[^/]+`]: { 'POST': 'Generated asset report' },
    [`${VM_BASE_PATH}/assessments/report/get-reports`]: { 'GET': 'Listed assessment reports' },
    [`${VM_BASE_PATH}/assessments/report/download-report/[^/]+`]: { 'GET': 'Downloaded assessment report' },
    [`${VM_BASE_PATH}/assessments/report/delete-report/[^/]+`]: { 'DELETE': 'Deleted assessment report' },
    [`${VM_BASE_PATH}/assessments/report/send-report/[^/]+`]: { 'POST': 'Sent assessment report' },
    [`${VM_BASE_PATH}/assessments/report/[^/]+`]: { 'GET': 'Viewed assessment by token' },
    [`${VM_BASE_PATH}/assessments/collaborator/[^/]+/assessments`]: { 'GET': 'Listed collaborator assessments' },
    [`${VM_BASE_PATH}/assessments/[^/]+/stats`]: { 'GET': 'Viewed assessment stats' },
    [`${VM_BASE_PATH}/assessments/[^/]+/stats/[^/]+`]: { 'GET': 'Viewed assessment stats by org' },
    [`${VM_BASE_PATH}/assessments/[^/]+/getPublicDetails`]: { 'GET': 'Viewed public assessment details' },
    [`${VM_BASE_PATH}/assessments/[^/]+/csv-export`]: { 'GET': 'Exported assessment CSV' },
    [`${VM_BASE_PATH}/assessments/leaderboard/[^/]+`]: { 'GET': 'Viewed assessment leaderboard' },
    [`${VM_BASE_PATH}/assessments/scope/[^/]+`]: { 'POST': 'Updated assessment scope' },
    [`${VM_BASE_PATH}/assessments/scope/remove/[^/]+`]: { 'POST': 'Removed asset from scope' },
    [`${VM_BASE_PATH}/assessments/[^/]+`]: {
        'GET': 'Viewed an assessment',
        'PUT': 'Updated an assessment',
        'DELETE': 'Deleted an assessment'
    },
    [`/csm/api/assessments/[^/]+`]: {
        'PUT': 'Updated an assessment'
    },

    // Vulnerabilities
    [`${VM_BASE_PATH}/myVulns`]: { 'GET': 'Listed vulnerabilities' },
    [`${VM_BASE_PATH}/myVulns/by-asset`]: { 'GET': 'Listed vulnerabilities by asset' },
    [`${VM_BASE_PATH}/myVulns/auto-vuln-lists`]: { 'GET': 'Viewed auto vuln lists' },
    [`${VM_BASE_PATH}/myVulns/search`]: { 'GET': 'Searched vulnerabilities' },
    [`${VM_BASE_PATH}/myVulns/search/history`]: { 'GET': 'Viewed search history' },
    [`${VM_BASE_PATH}/myVulns/universal`]: { 'POST': 'Viewed universal vuln details' },
    [`${VM_BASE_PATH}/myVulns/vuln-report/[^/]+`]: { 'GET': 'Viewed vuln report by token' },
    [`${VM_BASE_PATH}/myVulns/vuln-stats`]: { 'POST': 'Viewed vuln stats' },
    [`${VM_BASE_PATH}/myVulns/team/progress/[^/]+`]: { 'GET': 'Viewed team progress' },
    [`${VM_BASE_PATH}/myVulns/vm/integrate`]: { 'GET': 'Viewed asset vuln stats' },
    [`${VM_BASE_PATH}/myVulns/blocker/remove/[^/]+/[^/]+`]: { 'DELETE': 'Removed blocker from vulnerability' },
    [`${VM_BASE_PATH}/myVulns/business-units/map`]: { 'GET': 'Viewed business unit map' },
    [`${VM_BASE_PATH}/myVulns/business-units/counts`]: { 'GET': 'Viewed business unit counts' },
    [`${VM_BASE_PATH}/myVulns/[^/]+/report`]: { 'GET': 'Downloaded vuln PDF report' },
    [`${VM_BASE_PATH}/myVulns/[^/]+/duplicate`]: { 'POST': 'Duplicated vulnerability' },
    [`${VM_BASE_PATH}/myVulns/[^/]+`]: { 'GET': 'Listed vulnerabilities for assessment' },

    // Assets
    [`${VM_BASE_PATH}/assets`]: {
        'GET': 'Listed assets',
        'POST': 'Created a new asset'
    },
    [`${VM_BASE_PATH}/assets/general-details`]: { 'GET': 'Viewed asset details' },
    [`${VM_BASE_PATH}/assets/assessment/[^/]+`]: { 'GET': 'Listed assets by assessment' },
    [`${VM_BASE_PATH}/assets/get/stats`]: { 'GET': 'Viewed asset stats' },
    [`${VM_BASE_PATH}/assets/get/tags`]: { 'GET': 'Listed asset tags' },
    [`${VM_BASE_PATH}/assets/stats/[^/]+`]: { 'GET': 'Viewed asset stats by ID' },
    [`${VM_BASE_PATH}/assets/[^/]+`]: {
        'GET': 'Viewed an asset',
        'PUT': 'Updated an asset',
        'DELETE': 'Deleted an asset'
    },

    // Folders
    [`${VM_BASE_PATH}/folders`]: {
        'GET': 'Listed folders',
        'POST': 'Created a folder'
    },
    [`${VM_BASE_PATH}/folders/[^/]+/children`]: { 'POST': 'Created a child folder' },
    [`${VM_BASE_PATH}/folders/[^/]+/assessments`]: { 'POST': 'Added assessment to folder' },
    [`${VM_BASE_PATH}/folders/[^/]+/assessments/[^/]+`]: { 'DELETE': 'Removed assessment from folder' },
    [`${VM_BASE_PATH}/folders/[^/]+`]: {
        'GET': 'Viewed a folder',
        'PATCH': 'Updated a folder',
        'DELETE': 'Deleted a folder'
    },

    // Files
    [`${VM_BASE_PATH}/files/attachments/[^/]+`]: { 'GET': 'Listed attachments' },
    [`${VM_BASE_PATH}/files/evidence/[^/]+`]: { 'GET': 'Listed evidence' },
    [`${VM_BASE_PATH}/files/evidence/[^/]+/zip`]: { 'GET': 'Downloaded evidence ZIP' },
    [`${VM_BASE_PATH}/files/repair/[^/]+`]: { 'POST': 'Repaired file status' },
    [`${VM_BASE_PATH}/files/new`]: { 'POST': 'Uploaded a new file' },
    [`${VM_BASE_PATH}/files/[^/]+`]: {
        'POST': 'Uploaded a file',
        'DELETE': 'Deleted a file'
    },

    // Reports
    [`${VM_BASE_PATH}/reports`]: { 'GET': 'Listed reports' },
    [`${VM_BASE_PATH}/reports/generate`]: { 'POST': 'Generated a report' },
    [`${VM_BASE_PATH}/reports/data/[^/]+`]: { 'GET': 'Fetched report data' },
    [`${VM_BASE_PATH}/reports/[^/]+/download`]: { 'GET': 'Downloaded report' },
    [`${VM_BASE_PATH}/reports/[^/]+/preview`]: { 'GET': 'Previewed report' },
    [`${VM_BASE_PATH}/reports/[^/]+`]: {
        'GET': 'Viewed report status',
        'DELETE': 'Deleted report'
    },

    // Adapters
    [`${VM_BASE_PATH}/adapter`]: {
        'GET': 'Listed installed adapters',
        'POST': 'Installed an adapter'
    },
    [`${VM_BASE_PATH}/adapter/csv`]: { 'POST': 'Installed CSV adapter' },
    [`${VM_BASE_PATH}/adapter/refresh/[^/]+`]: { 'PATCH': 'Refreshed an adapter' },
    [`${VM_BASE_PATH}/adapter/[^/]+`]: { 'DELETE': 'Deleted an adapter' },

    // Integrations
    [`${VM_BASE_PATH}/integrations`]: {
        'GET': 'Listed integrations',
        'POST': 'Created an integration'
    },
    [`${VM_BASE_PATH}/integrations/[^/]+`]: {
        'GET': 'Viewed an integration',
        'PATCH': 'Updated an integration',
        'DELETE': 'Deleted an integration'
    },

    // SLA
    [`${VM_BASE_PATH}/sla/settings`]: {
        'GET': 'Viewed SLA settings',
        'POST': 'Updated SLA settings'
    },
    [`${VM_BASE_PATH}/sla/dashboard`]: { 'GET': 'Viewed SLA dashboard' },
    [`${VM_BASE_PATH}/sla/violations`]: { 'GET': 'Viewed SLA violations' },
    [`${VM_BASE_PATH}/sla/leaderboard`]: { 'GET': 'Viewed SLA leaderboard' },
    [`${VM_BASE_PATH}/sla/refresh`]: { 'POST': 'Refreshed SLA data' },
    [`${VM_BASE_PATH}/sla/report`]: { 'GET': 'Downloaded SLA report' },

    // Tickets
    [`${VM_BASE_PATH}/ticket/[^/]+/projects`]: { 'GET': 'Listed ticket projects' },
    [`${VM_BASE_PATH}/ticket/[^/]+/users`]: { 'GET': 'Listed ticket users' },
    [`${VM_BASE_PATH}/ticket/[^/]+/project/[^/]+/types`]: { 'GET': 'Listed ticket types' },
    [`${VM_BASE_PATH}/ticket/[^/]+/project/[^/]+/ticket/[^/]+/fields`]: { 'GET': 'Viewed ticket fields' },
    [`${VM_BASE_PATH}/ticket/[^/]+/project/[^/]+/statuses`]: { 'GET': 'Listed ticket statuses' },
    [`${VM_BASE_PATH}/ticket/[^/]+/create`]: { 'POST': 'Created a ticket' },
    [`${VM_BASE_PATH}/ticket/jira/webhook/[^/]+`]: { 'POST': 'Handled Jira webhook' },

    // Vulnerability Lists
    [`${VM_BASE_PATH}/vuln-lists`]: {
        'GET': 'Listed vuln lists',
        'POST': 'Created a vuln list'
    },
    [`${VM_BASE_PATH}/vuln-lists/[^/]+/add-vulns`]: { 'POST': 'Added vulns to list' },
    [`${VM_BASE_PATH}/vuln-lists/[^/]+/remove-vulns`]: { 'POST': 'Removed vulns from list' },
    [`${VM_BASE_PATH}/vuln-lists/[^/]+/export-csv`]: { 'GET': 'Exported vuln list CSV' },
    [`${VM_BASE_PATH}/vuln-lists/[^/]+/export-pdf`]: { 'GET': 'Exported vuln list PDF' },
    [`${VM_BASE_PATH}/vuln-lists/[^/]+`]: {
        'GET': 'Viewed a vuln list',
        'PATCH': 'Updated a vuln list',
        'DELETE': 'Deleted a vuln list'
    },

    // Custom Dashboards
    [`${VM_BASE_PATH}/custom-dashboards`]: {
        'GET': 'Listed custom dashboards',
        'POST': 'Created a custom dashboard'
    },
    [`${VM_BASE_PATH}/custom-dashboards/[^/]+`]: {
        'PATCH': 'Updated a custom dashboard',
        'DELETE': 'Deleted a custom dashboard'
    },

    // Workload
    [`${VM_BASE_PATH}/workload`]: { 'GET': 'Viewed assignee workload' },

    // Blockers
    [`${VM_BASE_PATH}/blockers`]: {
        'GET': 'Listed tasks',
        'POST': 'Created a task'
    },
    [`${VM_BASE_PATH}/blockers/all`]: { 'GET': 'Listed all tasks' },
    [`${VM_BASE_PATH}/blockers/[^/]+`]: {
        'GET': 'Viewed a task',
        'PATCH': 'Updated a task',
        'DELETE': 'Deleted a task'
    },

    // Calendar
    [`${VM_BASE_PATH}/calendar`]: {
        'GET': 'Viewed calendar',
        'PUT': 'Updated calendar'
    },
    [`${VM_BASE_PATH}/calendar/holidays`]: { 'POST': 'Added holiday' },
    [`${VM_BASE_PATH}/calendar/holidays/[^/]+`]: { 'DELETE': 'Removed holiday' },
    [`${VM_BASE_PATH}/calendar/weekend-days`]: { 'PUT': 'Set weekend days' },

    // Imports
    [`${VM_BASE_PATH}/import/vulns/[^/]+`]: { 'POST': 'Imported vulns' },
    [`${VM_BASE_PATH}/import/[^/]+/[^/]+`]: { 'POST': 'Imported vulnerabilities' },

    // SLA Monitor
    [`${VM_BASE_PATH}/sla-cron/monitor`]: { 'POST': 'Triggered SLA monitoring' },
    [`${VM_BASE_PATH}/sla-cron/report`]: { 'POST': 'Triggered weekly SLA report' },
    [`${VM_BASE_PATH}/sla-cron/run-all`]: { 'POST': 'Triggered full SLA cron job' },

    // Demo Data
    [`${VM_BASE_PATH}/demo-data/generate`]: { 'POST': 'Generated demo data' },

    // Admin & Internal
    // [`/vm/admin/run-asset-cron`]: { 'GET': 'Manually triggered asset stats update' },
    // [`/vm/admin/run-assessment-cron`]: { 'GET': 'Manually triggered assessment stats update' },
    // [`${VM_BASE_PATH}/internal/run-asset-cron`]: { 'POST': 'Manually triggered asset stats update (Internal)' },
    // [`${VM_BASE_PATH}/internal/run-assessment-cron`]: { 'POST': 'Manually triggered assessment stats update (Internal)' },
    // [`/vm/status`]: { 'GET': 'Checked VM service status' },

    // Downloads
    [`/vm/uploads/[^/]+`]: { 'GET': 'Downloaded file' },

};
