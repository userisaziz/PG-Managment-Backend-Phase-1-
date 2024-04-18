const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNo: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    floorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
    ],
    isEmpty: {
      type: Boolean,
      required: true,
    },
    feeMonth: {
      type: Number,
      required: true,
    },
    feePerDay: Number,
    maxOccupancy: {
      type: Number,
      required: true,
    },
    currentOccupancy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
