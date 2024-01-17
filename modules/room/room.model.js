const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo:{
    type:Number
  },
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
    type: Number,
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isEmpty: {
    type: Boolean,
    default:true
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
  totalBeds:{
    type:Number
  }
},
{
  timestamps:true
}
);

const room = mongoose.model("Room", roomSchema);

module.exports = room;
