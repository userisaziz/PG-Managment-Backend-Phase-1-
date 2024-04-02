// roomType.validator.js

const Joi = require("joi");

const createRoomTypeValidator = Joi.object({
  name: Joi.string().required(),
  maxOccupancy: Joi.number().required(),
});

const updateRoomTypeValidator = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  maxOccupancy: Joi.number().required(),
});

module.exports = {
  createRoomTypeValidator,
  updateRoomTypeValidator,
};
