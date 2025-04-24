const express = require("express");

const router = express.Router();

const template = require("./template.routes");
const notifications = require("./notification.routes");
const activity = require("./activity.routes");


router.use("/template", template);
router.use("/notification", notifications)
router.use("/activity", activity);

module.exports = router;