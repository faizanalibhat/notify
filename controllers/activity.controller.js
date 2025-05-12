const activityService = require('../services/activity.service');
const { catchError } = require("../utils/catchError");


const getAllActivity = catchError(async (req, res) => {
    const { orgId } = req.authenticatedService;

    const { page, limit } = req.query;

    const supportedFilters = {
        "product": "origin",
        "email": "owner.email",
        "endpoint": "raw.originalUrl",
        "ip": "raw.ip",
        "user": "owner.name"
    };

    const filter = {};

    for (let [key, value] of Object.entries(supportedFilters)) {

        if (!req.query[key]) continue;

        filter[value] = req.query[key];
    }

    const activity = await activityService.getAllActivity(orgId, filter, page, limit);

    return res.json(activity);
});


module.exports = { getAllActivity };