const express = require("express");

const router = express.Router();

const controller = require("../controllers/notification.controller");

router

.get("/bulk", controller.getAllNotifications)

.post("/:id/seen", controller.markNotificationSeen)

.post("/seen", controller.markAllAsSeen);


module.exports = router;