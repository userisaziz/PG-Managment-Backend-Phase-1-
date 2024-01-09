const router = require("express").Router();
const tenant_controller = require("../controllers/tenants");
router.post("/create-tenant", tenant_controller.createTenant);

module.exports = router;
