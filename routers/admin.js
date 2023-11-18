const express = require("express");
const admin_controller = require("../controllers/admin");

const router = express.Router();

router.post("/register", admin_controller.register);

module.exports = router;
