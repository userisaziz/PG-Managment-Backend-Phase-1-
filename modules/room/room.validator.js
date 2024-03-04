const Joi = require("joi");

module.exports.createRoomValidator = Joi.object({
  roomNo: Joi.number().required(),
  imageUrl: Joi.string(),
  roomType: Joi.string()
    .valid("single-sharing", "double-sharing", "triple-sharing", "four-sharing")
    .required(),
  floor: Joi.number().required(),
  hostelId: Joi.string().hex().length(24).required(),
  isEmpty: Joi.boolean(),
  feeMonth: Joi.number().required(),
  feePerDay: Joi.number().required(),
  bedRemaining: Joi.number(),
  totalBeds: Joi.number().required(),
});

module.exports.getAllRoomValidator = Joi.object({
  type: Joi.string().valid(
    "single-sharing",
    "double-sharing",
    "triple-sharing",
    "four-sharing"
  ),
  floor: Joi.number(),
  // feeType:Joi.string().valid('daily,monthly')
});
module.exports.getRoomValidator = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
