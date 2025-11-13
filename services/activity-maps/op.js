module.exports = {
    // OP API
    '/op/assets/subdomains': {
        'GET': 'Listed Subdomains in ASM',
    },
    '/op/assets/ips': {
        'GET': 'Listed IP Addresses in ASM',
    },
    '/op/dns': {
        'GET': 'Listed DNS Records in ASM'
    },
    '/op/ports': {
        'GET': "Listed Ports in ASM"
    },
    '/op/technologies': {
        'GET': "Listed Technologies in ASM"
    },
    '/op/assets/exposure': {
        'GET': "Listed Exposures in ASM",
    },
    'op/assets/exposure/[0-9a-f]+?/safe': {
        'POST': 'Marked An Exposure as Safe'
    },
    'op/assets/exposure/[0-9a-f]+?': {
        'PATCH': 'Edited Description & Severity of an Exposure'
    },
    '/op/report': {
        'GET': "Listed Reports in ASM",
        'POST': "Report Generated in ASM"
    },
    '/op/cmd/scans': {
        'GET': "Listed Scans in ASM",
        'POST': "Created a new scan in ASM"
    },
    '/op/cmd/scans/[0-9a-f]+?': {
        'DELETE': "Deleted a scan in ASM"
    },
    '/op/assets/[a-z]+?/asset/[0-9a-f]+?/exposure': {
        'POST': "Created an Exposure",
    },
};
