// hostel.model.js

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: String,
  district: String,
  pincode: Number,
});

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: addressSchema,
    floors: [Number], // Array to store floor numbers
    pgType: {
      type: String,
      enum: ["Male", "Female", "Co-living"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
