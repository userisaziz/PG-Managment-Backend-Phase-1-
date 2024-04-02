// roomType.model.js

const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  maxOccupancy: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("RoomType", roomTypeSchema);
