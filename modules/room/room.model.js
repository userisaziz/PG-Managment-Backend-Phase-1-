const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  roomType: {
    type: String,
    enum: [
      "single-sharing",
      "double-sharing",
      "triple-sharing",
      "four-sharing",
    ],
  },
  floor: {
    type: String,
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isEmpty: {
    type: Boolean,
  },
  feeMonth: {
    type: Number,
  },
  feePerDay: {
    type: Number,
  },
  bedRemaining: {
    type: Number,
  },
});

const room = mongoose.model("Room", roomSchema);

module.exports = room;
