const express = require("express");
const router = express.Router();
const expenseController = require("./expense.controller");
const expenseValidator = require("./expense.validator");

router.post(
  "/",
  expenseValidator.validateExpense,
  expenseController.createExpense
);
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.put(
  "/:id",
  expenseValidator.validateExpense,
  expenseController.updateExpense
);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;