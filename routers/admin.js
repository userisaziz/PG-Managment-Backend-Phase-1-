const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("getting the into admin router");
  return res.send("amdin router");
});

module.exports = router;
