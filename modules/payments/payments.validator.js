const { check, validationResult } = require("express-validator");

exports.validatePayment = [
  check("tenant")
    .exists()
    .withMessage("Tenant is required")
    .isMongoId()
    .withMessage("Invalid Tenant ID"),
  check("amount")
    .exists()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  check("method")
    .exists()
    .withMessage("Payment method is required")
    .isIn(["Cash", "Online", "Cheque"])
    .withMessage("Invalid payment method"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateExpense = [
  check("hostel")
    .exists()
    .withMessage("Hostel is required")
    .isMongoId()
    .withMessage("Invalid Hostel ID"),
  check("category")
    .exists()
    .withMessage("Category is required")
    .isIn(["Rent", "Utilities", "Salaries", "Maintenance", "Other"])
    .withMessage("Invalid category"),
  check("amount")
    .exists()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
