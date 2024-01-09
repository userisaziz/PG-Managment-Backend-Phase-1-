const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
  },
  emergencyContactNumber: {
    type: Number,
  },
  adhaarNumber: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  temporaryAddress: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

module.exports = mongoose.model("tenant", tenantSchema);
