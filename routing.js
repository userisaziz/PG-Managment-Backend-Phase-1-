const express = require("express");
const routers = express.Router();

const adminRouter = require("./routers/admin");
const tenantRouter = require('./routers/tenants')
routers.use("/admin", adminRouter);
routers.use("/tenant", tenantRouter);

module.exports = routers;
