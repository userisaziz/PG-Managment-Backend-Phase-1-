const express = require("express");
const admin_controller = require("../admin/admin.controller");

const router = express.Router();

router.post("/register", admin_controller.register);

module.exports = router;
