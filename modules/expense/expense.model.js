const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const ExpenseSchema = new mongoose.Schema(
  {
    category: categorySchema,
    Hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
    },
    roomNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    date: "String",
    Amount: "Number",
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
