// Handler for /internal/activity/:orgId with filters and stats
const getOrgActivityWithStats = catchError(async (req, res) => {
    const { orgId } = req.params;

    const { page = 1, limit = 10, sortBy = 'createdAt', sortAs = 'desc', search = '' } = req.query;

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
        } else {
            filter[attribute] = { $in: req.query[key].split(",") };
        }
    }

    if (search) {
        filter.$or = [
            { action: { $regex: search, $options: 'i' } },
            { 'user.name': { $regex: search, $options: 'i' } },
            { 'user.email': { $regex: search, $options: 'i' } },
            { 'raw.ip': { $regex: search, $options: 'i' } },
            { 'raw.originalUrl': { $regex: search, $options: 'i' } },
        ];
    }

    // Fetch paginated activity
    const activity = await activityService.getAllActivity(orgId, filter, page, limit, sortBy, sortAs);

    // For stats, fetch all matching activity (no pagination)
    const Activity = require("../models/activity.model");
    const match = { orgId, ...filter };
    const allActivity = await Activity.find(match);

    // 1. User and number of logs
    const userLogs = {};
    // 2. Top 10 visited endpoints
    const endpointCounts = {};
    // 3. Product wise number of logs
    const productCounts = {};

    allActivity.forEach(act => {
        // user log count
        const uname = act.user?.name || 'Unknown';
        userLogs[uname] = (userLogs[uname] || 0) + 1;
        // endpoint count
        const endpoint = act.raw?.originalUrl || 'Unknown';
        endpointCounts[endpoint] = (endpointCounts[endpoint] || 0) + 1;
        // product count
        const product = act.origin || 'Unknown';
        productCounts[product] = (productCounts[product] || 0) + 1;
    });

    // Sort and get top 10 endpoints
    const topEndpoints = Object.entries(endpointCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([endpoint, count]) => ({ endpoint, count }));

    // Format user logs
    const userLogStats = Object.entries(userLogs).map(([user, count]) => ({ user, count }));
    // Format product logs
    const productLogStats = Object.entries(productCounts).map(([product, count]) => ({ product, count }));

    return res.json({
        ...activity,
        stats: {
            userLogStats,
            topEndpoints,
            productLogStats
        }
    });
});
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
            filter[attribute] = { $in: req.query[key].split(",") };
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


module.exports = { getAllActivity, getOrgActivityWithStats };