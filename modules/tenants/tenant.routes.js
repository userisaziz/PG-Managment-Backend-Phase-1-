const router = require("express").Router();
const tenant_controller = require("./tenant.controller");
router.post("/create-tenant", tenant_controller.createTenant);
router.get('/tenant-details',tenant_controller.getAllTenant)
router.get('/:id',tenant_controller.getTenant)
module.exports = router;
