const Activity = require("../models/activity.model");

const vsMap = require('./activity-maps/vs');
const opMap = require('./activity-maps/op');
const vmMap = require('./activity-maps/vm');
const aimMap = require('./activity-maps/aim');
const riskRegisterMap = require('./activity-maps/riskRegister');

// endpoint to activity map
const endpointWithMethodActionMap = {
    ...vsMap,
    ...opMap,
    ...vmMap,
    ...aimMap,
    ...riskRegisterMap,
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


        const supportedFilters = {};

        supportedFilters.users = await Activity.distinct('user.email', { orgId: orgId });

        return { activity, total, filters: supportedFilters }; 
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