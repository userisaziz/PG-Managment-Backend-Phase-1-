// hostel.validator.js

const Joi = require("joi");

// Define Joi schema for hostel creation
exports.createHostelValidator = Joi.object({
  name: Joi.string().required(),
  address: Joi.object({
    state: Joi.string().required(),
    district: Joi.string().required(),
    pincode: Joi.number().required(),
  }),
  floors: Joi.array().items(Joi.number().integer().min(1)),
});
