// expenseService.js

const Expense = require("./expense.model");

exports.createExpense = async (expenseData) => {
  try {
    return await Expense.create(expenseData);
  } catch (error) {
    throw new Error("Error creating expense");
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
