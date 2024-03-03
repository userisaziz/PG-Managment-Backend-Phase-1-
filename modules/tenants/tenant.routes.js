const router = require("express").Router();
const tenant_controller = require("./tenant.controller");
router.post("/", tenant_controller.createTenant);
router.get("/all-tenant", tenant_controller.getAllTenant);
router.get("/:id", tenant_controller.getTenant);
module.exports = router;
