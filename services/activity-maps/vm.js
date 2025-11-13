module.exports = {
    //  VM API  
    '//api/myVulns': {
        'GET': "Listed All Vulnerabilities in VM",
    },
    '//api/assessments': {
        'GET': "Listed All Assessments in VM",
    },
    '//api/assets': {
        'GET': "Listed All Assets in VM",
    },
    '//api/assessments/report/get-reports': {
        'GET': "Listed All Reports in VM",
    },
    '//api/assessments/report/delete-report/[0-9a-f]+': {
        'DELETE': "Deleted a report in VM",
    },
    '//api/assessments/[0-9a-f]+': {
        'GET': "Opened An Assessment"
    },
    '//api/assessments/[0-9a-f]+': {
        'GET': "Opened An Assessment",
        'PUT': "Updated an assessment",
        'DELETE': "Deleted an assessment",
    },
    '//api/assessments/[0-9a-f]+/vuln/[0-9a-f]+': {
        'GET': 'Opened a Vulnerability Report',
        'PUT': "Updated a Vulnerability",
        "DELETE": "Deleted a Vulnerability Report"
    },
    '//api/files/new': {
        'POST': "Uploaded an attachment on a vulnerability report."
    },
    '//api/files/[0-9a-f]+': {
        'DELETE': 'Deleted an attachment on a vulnerability report.',
    },
    '//api/folders': {
        'GET': "Listed Assessment Groups in VM",
        'POST': "Created an assessment group in VM",
    },
    '//api/folders/[0-9a-f]+': {
        'PUT': "Updated an assessment group in VM",
        'PATCH': "Updated an assessment group in VM",
        'DELETE': 'Deleted an assessment group in VM',
    },
    '//api/folders/[0-9a-f]+/assessments': {
        'POST': 'Added an assessment to group',
    },
    '//api/folders/[0-9a-f]+/assessments/[0-9a-f]+': {
        'DELETE': 'Removed an assessment from the group',
    },
};
