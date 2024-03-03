const express = require("express");
const admin_controller = require("../admin/admin.controller");

const router = express.Router();

router.post("/register", admin_controller.register);
router.post("/login", admin_controller.login);

module.exports = router;
