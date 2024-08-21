const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "2023-10"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);