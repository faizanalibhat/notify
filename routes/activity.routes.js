const express = require("express");

const router = express.Router();

const controller = require("../controllers/activity.controller");

router

.get("/bulk", controller.getAllActivity);


module.exports = router;