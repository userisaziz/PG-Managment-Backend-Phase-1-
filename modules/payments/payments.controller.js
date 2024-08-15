const Payment = require("./payments.model");

exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("tenant");
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
