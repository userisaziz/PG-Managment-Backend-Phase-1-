const router = require("express").Router();
const tenant_controller = require("./tenant.controller");
router.post("/create-tenant", tenant_controller.createTenant);
// router.get('')

module.exports = router;
