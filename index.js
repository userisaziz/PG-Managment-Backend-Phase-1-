const express = require("express");
const { connectDb } = require("./config/database");
const routers = require("./routing");

const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 3011;

connectDb();

app.use("/api/v1", routers);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
