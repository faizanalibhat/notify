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
}


const parseActivity = (endpoint, method) => {

    const activity = endpointWithMethodActionMap?.[endpoint]?.[method];

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


const getAllActivity = async (orgId, filter={}, page=1, limit=10) => {
    try {
        const activity = await Activity.find(filter).skip((page-1)*limit).limit(limit);
        const total = await Activity.countDocuments({});

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