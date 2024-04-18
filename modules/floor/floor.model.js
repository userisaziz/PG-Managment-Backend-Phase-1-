const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("Floor", floorSchema);
