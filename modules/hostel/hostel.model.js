const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: Number, required: true },
});

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // address: addressSchema, // Use the address schema here
  pgType: { type: String, required: true },
  numFloors: { type: Number, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Floor" }],
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }],
  expenses: { type: Number, default: 0 },
  dailyIncome: { type: Number, default: 0 }, // Add dailyIncome field
  netIncome: { type: Number, default: 0 }, // Add netIncome field
});

module.exports = mongoose.model("Hostel", hostelSchema);