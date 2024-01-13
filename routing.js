const express = require("express");
const routers = express.Router();

const adminRouter = require("./modules/admin/admin.routes");
const tenantRouter = require("./modules/tenants/tenant.routes");
routers.use("/admin", adminRouter);
routers.use("/tenant", tenantRouter);

module.exports = routers;
