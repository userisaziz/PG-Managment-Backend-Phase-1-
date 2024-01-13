const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  imageUrl: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  pgType: {
    type: String,
    enum: ["Gents", "Ladies"],
  },
  address: {
    type: addressSchema,
  },
});

module.exports = mongoose.model("Hostel", hostelSchema);
