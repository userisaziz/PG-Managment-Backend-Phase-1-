const Payment = require("./payments.model");
const Tenant = require("../tenants/tenant.model");
const Hostel = require("../hostel/hostel.model");

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

// ... existing code ...

// Endpoint to record a payment for a tenant

exports.recordPayment = async (req, res) => {
  try {
    const { tenantId, amount, month } = req.body;

    // Validate required fields
    if (!tenantId || !amount || !month) {
      return res.status(400).json({ error: "tenantId, amount, and month are required fields." });
    }

    // Check if payment for the specified month already exists
    let payment = await Payment.findOne({ tenant: tenantId, month });
    if (payment) {
      // Update the existing payment
      payment.amount = amount;
      await payment.save();
    } else {
      // Create a new payment
      payment = await Payment.create({ tenant: tenantId, amount, month });
    }

    // Update tenant's rent history
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const existingEntry = tenant.rentHistory.find(entry => entry.month === month);
    if (existingEntry) {
      existingEntry.amountPaid = amount;
    } else {
      tenant.rentHistory.push({ month, year: new Date(month).getFullYear(), amountPaid: amount });
    }
    await tenant.save();

    // Update the hostel's income
    const hostel = await Hostel.findById(tenant.hostel);
    if (hostel) {
      hostel.dailyIncome += amount;
      hostel.netIncome += amount;
      await hostel.save();
    }

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Endpoint to fetch payments for a specific tenant
exports.getPaymentsByTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const payments = await Payment.find({ tenant: tenantId }).populate("tenant");
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Endpoint to fetch payments for a specific month
exports.getPaymentsByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const payments = await Payment.find({ month }).populate("tenant");
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};