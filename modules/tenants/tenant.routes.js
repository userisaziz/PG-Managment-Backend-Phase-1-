const express = require("express");
const router = express.Router();
const TenantController = require("./tenant.controller");

// Define routes with corresponding controller functions
router.post("/create-tenant", TenantController.createTenant);
router.get("/all-tenants", TenantController.getAllTenants);
router.put("/:id", TenantController.updateTenant);
router.delete("/:id", TenantController.deleteTenant);

router.post("/mark-rent-payment", TenantController.markRentPaid);
router.get("/overdue-payments", TenantController.getTenantsWithUnpaidRent);
router.post("/change-room", TenantController.changeRoom); // This line is causing the error
module.exports = router;