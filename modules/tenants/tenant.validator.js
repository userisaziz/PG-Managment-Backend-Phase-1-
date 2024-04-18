const Joi = require("joi");

// Validation schema for creating a new tenant
const createTenantSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNo: Joi.number().integer().required(),
  type: Joi.string().valid("Student", "Employed", "Guest").required(),
  hostelId: Joi.string().required(), // Assuming hostelId is a string
  roomId: Joi.string().required(), // Assuming roomId is a string
  emergencyContactNumber: Joi.number(),
  adhaarNumber: Joi.string().required(),
  permanentAddress: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number().required(),
  }).required(),
  temporaryAddress: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number().required(),
  }).required(),
  rentedDate: Joi.date().iso().required(),
  rentType: Joi.string()
    .valid("daily", "monthly")
    .default("monthly")
    .required(),
});

// Validation function for create tenant request

module.exports = {
  createTenantSchema,
};
