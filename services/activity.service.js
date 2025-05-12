const Activity = require("../models/activity.model");


// endpoint to activity map
const endpointWithMethodActionMap = {
    '/vs/api/groups' : {
        'GET': 'Listed Groups in VS',
        'POST': 'Created a Group in VS',
        'PATCH': 'Updated a group in VS',
        'DELETE': "Removed a group from VS",
    },
    '/vs/api/scans': {
        'GET': 'Listed Scans in VS',
        'POST': 'Created a Scan in VS',
        'PATCH': 'Updated a Scan in VS',
        'DELETE': 'Removed a Scan from VS'
    },
    '/vs/api/scanners': {
        'GET': 'Listed Scanners in VS',
        'POST': 'Created a Scanner in VS',
        'PATCH': 'Updated a Scanner in VS',
        'DELETE': 'Removed a Scanner from VS'
    },


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
    '//api/assessments/[0-9a-f]+': {
        'GET': "Opened An Assessment"
    },
    '//api/assessments/[0-9a-f]+': {
        'GET': "Opened An Assessment",
        'PUT': "Updated an assessment",
    },
    '//api/assessments/[0-9a-f]+/vuln/[0-9a-f]+': {
        'GET': 'Opened a Vulnerability Report',
        'PUT': "Updated a Vulnerability"
    },



    // AIM API
    '//api/assets': {
        'GET': 'Listed Assets in Asset Inventory',
    },
    '//api/default': {
        'POST': "Created new default Rule",
        'GET': "Listed Default Rules in Asset Inventory",
    },
    '//api/asset-groups/': {
        'GET': "Listed asset groups in Asset Inventory",
        'POST': "Created a new asset group in AIM",
    },
    '//api/exports':  {
        'GET': "Listed API Exports",
        'POST': "Created an Asset Export"
    },
    '//api/integrate/[a-zA-Z0-9]': {
        'POST': "Integrated an Adapter with AIM",
    },
    '//api/integrations/active': {
        'GET': "Listed all active adapters in AIM",
    },
    '//api/integrations/[0-9a-z]+': {
        'DELETE': "Removed an Adapter from AIM"
    }
}


const parseActivity = (endpoint, method) => {

    // get all regex keys
    let keys = Object.keys(endpointWithMethodActionMap);

    // find the key that matches the endpoint and use it to find the activity.
    let matchingKey = keys.filter(key => {
        let match = endpoint.match(`^${key}$`);

        if (match && match?.length) {
            return true;
        }

        return false;
    });


    const activity = endpointWithMethodActionMap?.[matchingKey]?.[method];

    return activity;

}


const createActivity = async (orgId, activity) => {
    try {
        const created = await Activity.create({ orgId, ...activity });

        return created;
    }
    catch(error) {
        console.log(error);
        return { status: "failed", message: "failed to create activity" };
    }
}


const getAllActivity = async (orgId, filter={}, page=1, limit=10, sortBy='createdAt', sortAs="desc") => {
    try {
        const activity = await Activity.find({ orgId, ...filter }).sort({ [sortBy]: sortAs == 'desc' ? -1 : 1 }).skip((page-1)*limit).limit(limit);
        const total = await Activity.countDocuments({ orgId });

        return { activity, total }; 
    }
    catch(err) {
        console.log(err);
        return { status: 'failed', message: "failed to create activity" };
    }
}



module.exports = {
    parseActivity,
    createActivity,
    getAllActivity,
}