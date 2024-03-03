const Joi = require("joi");
module.exports.registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNo: Joi.string()
    .min(10)
    .regex(/^\d{10}$/)
    .required(),
  password: Joi.string().min(5).required(),
});
module.exports.registerValidator = Joi.object({
  email: Joi.string().email().required(),
  mobileNo: Joi.string()
    .min(10)
    .regex(/^\d{10}$/)
    .required(),
  password: Joi.string().min(5).required(),
});
