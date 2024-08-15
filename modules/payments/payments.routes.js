const express = require("express");
const router = express.Router();
const paymentController = require("./payments.controller");

const { validatePayment } = require("./payments.validator");

// Payment Routes
router.post("/payments", validatePayment, paymentController.createPayment);
router.get("/payments", paymentController.getPayments);

// Expense Routes

module.exports = router;
