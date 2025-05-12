const activityService = require('../services/activity.service');
const { catchError } = require("../utils/catchError");


const getAllActivity = catchError(async (req, res) => {
    const { orgId } = req.authenticatedService;

    const { page, limit } = req.query;

    const supportedFilters = {
        "product": { attribute: "origin", isRegex: false },
        "email": { attribute: "owner.email", isRegex: true },
        "endpoint": { attribute: "raw.originalUrl", isRegex: true },
        "ip": { attribute: "raw.ip", isRegex: true },
        "user": { attribute: "owner.name", isRegex: true },
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

    const activity = await activityService.getAllActivity(orgId, filter, page, limit);

    return res.json(activity);
});


module.exports = { getAllActivity };