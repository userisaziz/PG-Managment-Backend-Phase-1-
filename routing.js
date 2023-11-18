const express = require("express");
const routers = express.Router();

const adminRouter = require("./routers/admin");

routers.use("/admin", adminRouter);

module.exports = routers;
