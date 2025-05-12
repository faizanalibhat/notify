const activityService = require('../services/activity.service');
const { catchError } = require("../utils/catchError");


const getAllActivity = catchError(async (req, res) => {
    const { orgId } = req.authenticatedService;

    const { page, limit, sortBy = 'createdAt', sortAs = 'desc', search = '' } = req.query;

    const supportedFilters = {
        "product": { attribute: "origin", isRegex: false },
        "email": { attribute: "user.email", isRegex: true },
        "endpoint": { attribute: "raw.originalUrl", isRegex: true },
        "ip": { attribute: "raw.ip", isRegex: true },
        "user": { attribute: "user.name", isRegex: true },
    };

    const filter = {};

    for (let [key, value] of Object.entries(supportedFilters)) {

        if (!req.query[key]) continue;

        const { attribute, isRegex } = value;

        if (isRegex) {
            filter[attribute] = { $regex: req.query[key], $options: 'i' };
        }
        else {
            filter[attribute] = req.query[key];
        }
    }

    // add search filter
    if (search) {
        filter.$or = [
            { action: { $regex: search, $options: 'i' } },
            { 'user.name': { $regex: search, $options: 'i' } },
            { 'user.email': { $regex: search, $options: 'i' } },
            { 'raw.ip': { $regex: search, $options: 'i' } },
            { 'raw.originalUrl': { $regex: search, $options: 'i' } },
        ]
    }

    const activity = await activityService.getAllActivity(orgId, filter, page, limit, sortBy, sortAs);

    return res.json(activity);
});


module.exports = { getAllActivity };    