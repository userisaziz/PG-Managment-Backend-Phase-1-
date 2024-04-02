const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
});

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
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
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
    bookings: [bookingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
