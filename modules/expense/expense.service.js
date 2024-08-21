// expenseService.js

const Expense = require("./expense.model");
const Hostel = require("../hostel/hostel.model"); // Ensure this import is present

exports.createExpense = async (expenseData) => {
  try {
    return await Expense.create(expenseData);
  } catch (error) {
    throw new Error("Error creating expense");
  }

};
exports.updateHostelExpenses = async (hostelId, amount) => {
  try {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      throw new Error("Hostel not found");
    }
    hostel.expenses += amount;
    await hostel.save();
  } catch (error) {
    console.log('error: ', error);
    throw new Error(error);
  }
};
exports.getExpenseById = async (expenseId) => {
  try {
    return await Expense.findById(expenseId);
  } catch (error) {
    throw new Error("Error finding expense");
  }
};

exports.updateExpense = async (expenseId, updateData) => {
  try {
    return await Expense.findByIdAndUpdate(expenseId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Error updating expense");
  }

};

exports.deleteExpense = async (expenseId) => {
  try {
    return await Expense.findByIdAndDelete(expenseId);
  } catch (error) {
    throw new Error("Error deleting expense");
  }
};

exports.getAllExpenses = async () => {
  try {
    return await Expense.find();
  } catch (error) {
    throw new Error("Error fetching expenses");
  }
};
