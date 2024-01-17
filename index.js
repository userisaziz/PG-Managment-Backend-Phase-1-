const express = require("express");
const { connectDb } = require("./config/database");
const routers = require("./routing");
const { NotFound, BadRequest } = require("./utils/errorHandling");
const morgan = require('morgan')
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(morgan(":method :url :response-time ms"))
const PORT = process.env.PORT || 3011;

connectDb();

app.use("/api/v1", routers);
app.all('*', function(req, res) {
  throw new BadRequest(`Route Does not exists ${req.url}`)
})
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFound || err instanceof BadRequest) {
    return res
      .status(err.statusCode)
      .json({ success: false, status: err.statusCode, error: err.message });
  }
  return res
    .status(500)
    .json({ success: false, status: 500, error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
