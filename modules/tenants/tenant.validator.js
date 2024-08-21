const Joi = require("joi");

// Validation schema for creating a new tenant
const createTenantSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNo: Joi.number().integer().required(),
  type: Joi.string().valid("Student", "Employed", "Guest").required(),
  hostelId: Joi.string().required(),
  roomId: Joi.string().required(),
  emergencyContactNumber: Joi.number().required(),
  adhaarNumber: Joi.string().required(),
  permanentAddress: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number().required(),
  }).required(),
  temporaryAddress: Joi.object({
    state: Joi.string(),
    district: Joi.string(),
    pincode: Joi.number(),
  }).required(),
  rentedDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required(),
  rentType: Joi.string()
    .valid("daily", "monthly")
    .default("monthly")
    .required(),
});

const paramsIdValidator = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});
module.exports = {
  createTenantSchema,
  paramsIdValidator,
};
