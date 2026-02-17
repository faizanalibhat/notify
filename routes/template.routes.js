const express = require("express");

const router = express.Router();

const controller = require("../controllers/template.controller");


router

.post("/:id/test", controller.testTemplateByIdController);


module.exports = router;