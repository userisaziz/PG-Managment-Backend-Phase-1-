const express = require("express");
const router = express.Router();
const TenantController = require("./tenant.controller");

// Define routes with corresponding controller functions
router.post("/create-tenant", TenantController.createTenant);
router.get("/", TenantController.getAllTenants);
router.get("/:id", TenantController.getTenantById);
router.put("/:id", TenantController.updateTenant);
router.delete("/:id", TenantController.deleteTenant);

module.exports = router;
