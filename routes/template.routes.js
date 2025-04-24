const express = require("express");

const router = express.Router();

const controller = require("../controllers/template.controller");


router

.post("/", controller.createTemplateController)

.get("/bulk", controller.getAllTemplatesController)

.get("/:id", controller.getTemplateByIdController)

.patch("/:id", controller.updateTemplateByIdController)

.delete("/:id", controller.deleteTemplateByIdController)

.post("/:id/test", controller.testTemplateByIdController);


module.exports = router;