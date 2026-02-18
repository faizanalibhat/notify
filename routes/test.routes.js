const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controller");

router.post("/test-all-templates", testController.testAllTemplates);

module.exports = router;
