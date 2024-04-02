const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["Student", "Employed", "Guest"],
      required: true,
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    emergencyContactNumber: {
      type: Number,
    },
    adhaarNumber: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: addressSchema,
      required: true,
    },
    temporaryAddress: {
      type: addressSchema,
      required: true,
    },
    rentedDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    rentType: {
      type: String,
      enum: ["daily", "monthly"],
      default: "monthly",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
