const activityService = require('../services/activity.service');
const { catchError } = require("../utils/catchError");


const getAllActivity = catchError(async (req, res) => {
    const { orgId } = req.authenticatedService;

    const { page, limit } = req.query;

    const filter = {};

    const activity = await activityService.getAllActivity(orgId, filter, page, limit);

    return res.json(activity);
});


module.exports = { getAllActivity };