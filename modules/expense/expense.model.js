const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const ExpenseSchema = new mongoose.Schema(
  {
    category: categorySchema,
    // admin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
    Hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
    },
    roomNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    date: String,
    Amount: Number,
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurrenceInterval: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);