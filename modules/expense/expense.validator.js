const { body, validationResult } = require("express-validator");

exports.validateExpense = [
  body("category.name").notEmpty().withMessage("Category name is required"),
  body("category.description")
    .notEmpty()
    .withMessage("Category description is required"),
  // body("admin").notEmpty().withMessage("Admin ID is required"),
  body("Hostel").notEmpty().withMessage("Hostel ID is required"),
  // body("roomNumber").notEmpty().withMessage("Room number is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("Amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be numeric"),
  body("isRecurring").isBoolean().withMessage("isRecurring must be a boolean"),
  body("recurrenceInterval")
    .optional()
    .isIn(["daily", "weekly", "monthly", "yearly"])
    .withMessage("Invalid recurrence interval"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];