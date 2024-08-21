const express = require("express");
const router = express.Router();
const analyticsController = require("./analytics.controller");

router.get("/analytics", analyticsController.getAnalytics);

module.exports = router;