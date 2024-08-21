const express = require("express");
const router = express.Router();
const paymentController = require("./payments.controller");

const { validatePayment } = require("./payments.validator");

// Payment Routes
router.post("/", validatePayment, paymentController.createPayment);
router.get("/", paymentController.getPayments);

// New Routes
router.post("/record", paymentController.recordPayment);
router.get("/tenant/:tenantId", paymentController.getPaymentsByTenant);
router.get("/month/:month", paymentController.getPaymentsByMonth);

module.exports = router;