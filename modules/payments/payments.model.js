const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  method: {
    type: String,
    enum: ["Cash", "Online", "Cheque"],
    required: true,
  },
  transactionId: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
