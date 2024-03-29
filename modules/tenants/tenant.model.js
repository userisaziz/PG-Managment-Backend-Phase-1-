const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["Student", "Employed", "Guest"],
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  emergencyContactNumber: {
    type: Number,
  },
  adhaarNumber: {
    type: String,
  },
  permanentAddress: {
    type: addressSchema,
  },
  temporaryAddress: {
    type: addressSchema,
  },
  rentedDate: {
    type: Date,
  },
  rentType: {
    type: String,
    enum: ["daily", "monthly"],
  },
},
{
  timestamps:true
}
);

module.exports = mongoose.model("Tenant", tenantSchema);
