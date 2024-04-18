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
    floors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor",
      },
    ],
    pgType: {
      type: String,
      enum: ["Male", "Female", "Co-living"],
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
