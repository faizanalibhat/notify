const express = require("express");

const router = express.Router();

const controller = require("../controllers/notification.controller");

router

.get("/bulk", controller.getAllNotifications);


module.exports = router;