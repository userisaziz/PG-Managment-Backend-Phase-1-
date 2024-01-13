const express = require("express");
const routers = express.Router();

const adminRouter = require("./modules/admin/admin.routes");
const tenantRouter = require("./modules/tenants/tenant.routes");
const roomRouter = require("./modules/room/room.routes");
const hostelRouter = require("./modules/hostel/hostel.routes");
routers.use("/admin", adminRouter);
routers.use("/tenant", tenantRouter);
routers.use("/room", roomRouter);
routers.use("/hostel", hostelRouter);

module.exports = routers;
