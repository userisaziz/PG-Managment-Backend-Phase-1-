const express = require("express");
const routers = express.Router();

const adminRouter = require("./modules/admin/admin.routes");
const tenantRouter = require("./modules/tenants/tenant.routes");
const roomRouter = require("./modules/room/room.routes");
const hostelRouter = require("./modules/hostel/hostel.routes");
const paymentsRouter = require("./modules/payments/payments.routes");

const floorRouter = require("./modules/floor/floor.routes");
const expenseRouter = require("./modules/expense/expense.routes");
// const analyticsRouter = require("./modules/analytics/analytics.routes");

routers.use("/admin", adminRouter);
routers.use("/tenant", tenantRouter);
routers.use("/room", roomRouter);
routers.use("/hostel", hostelRouter);

routers.use("/payments", paymentsRouter);
// routers.use("/analytics", analyticsRouter);
routers.use("/floor", floorRouter);
routers.use("/expenses", expenseRouter);

module.exports = routers;
