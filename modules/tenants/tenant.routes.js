const express = require("express");
const router = express.Router();
const TenantController = require("./tenant.controller");

// Define routes with corresponding controller functions
router.post("/create-tenant", TenantController.createTenant);
router.get("/all-tenants", TenantController.getAllTenants);
// router.get("/:id", TenantController.getTenantById);
router.put("/:id", TenantController.updateTenant);
router.delete("/:id", TenantController.deleteTenant);
//

router.post("/mark-rent-payment", TenantController.markRentPayment);
router.get("/overdue-payments", TenantController.getTenantsWithOverduePayments);

module.exports = router;
