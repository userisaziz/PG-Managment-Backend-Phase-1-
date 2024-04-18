const express = require("express");
const routers = express.Router();

const adminRouter = require("./modules/admin/admin.routes");
const tenantRouter = require("./modules/tenants/tenant.routes");
const roomRouter = require("./modules/room/room.routes");
const hostelRouter = require("./modules/hostel/hostel.routes");
const roomTypeRouter = require("./modules/roomType/roomType.routes");
const floorRouter = require("./modules/floor/floor.routes");
const expenseRouter = require("./modules/expense/expense.routes");

routers.use("/admin", adminRouter);
routers.use("/tenant", tenantRouter);
routers.use("/room", roomRouter);
routers.use("/hostel", hostelRouter);
routers.use("/roomType", roomTypeRouter);
routers.use("/floor", floorRouter);
routers.use("/expense", expenseRouter);

module.exports = routers;
