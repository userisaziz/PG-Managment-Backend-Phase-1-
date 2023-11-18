const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
});

module.exports = mongoose.model("admin", adminSchema);
