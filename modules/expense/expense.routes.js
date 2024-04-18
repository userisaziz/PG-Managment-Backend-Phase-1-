// expenseRoutes.js

const express = require("express");
const router = express.Router();
const expenseController = require("./expense.controller");
const expenseValidator = require("./expense.validator");

router.post(
  "/expenses",
  expenseValidator.validateExpense,
  expenseController.createExpense
);
router.get("/expenses", expenseController.getAllExpenses);
router.get("/expenses/:id", expenseController.getExpenseById);
router.put(
  "/expenses/:id",
  expenseValidator.validateExpense,
  expenseController.updateExpense
);
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
