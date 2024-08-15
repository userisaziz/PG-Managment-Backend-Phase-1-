const Joi = require("joi");

const createRoomValidator = Joi.object({
  roomNo: Joi.number().required(),
  // floorNo: Joi.number().required(),
  imageUrl: Joi.string().required(),
  // roomTypeId: Joi.string().required(),
  floorId: Joi.string().required(),
  hostelId: Joi.string().required(),

  feeMonth: Joi.number().required(),
  feePerDay: Joi.number().required(),
  maxOccupancy: Joi.number(),
  currentOccupancy: Joi.number(),
});

const updateRoomValidator = Joi.object({
  roomId: Joi.string().required(),
  roomNo: Joi.number().required(),
  imageUrl: Joi.string(),
  roomType: Joi.string().required(),
  floor: Joi.number().required(),
  hostelId: Joi.string().required(),
  isEmpty: Joi.boolean(),
  feeMonth: Joi.number(),
  feePerDay: Joi.number(),
});

const bookRoomValidator = Joi.object({
  roomId: Joi.string().required(),
  tenantId: Joi.string().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().min(Joi.ref("checkInDate")).required(),
});

module.exports = {
  createRoomValidator,
  updateRoomValidator,
  bookRoomValidator,
};
