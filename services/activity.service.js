const Activity = require("../models/activity.model");


// IMPLEMENT LATER
const parseActivity = async (activity) => {
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