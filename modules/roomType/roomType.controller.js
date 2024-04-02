// roomType.controller.js

const RoomTypeService = require("./roomType.service");
const { BadRequest } = require("../../utils/errorHandling");
const {
  createRoomTypeValidator,
  updateRoomTypeValidator,
} = require("./roomType.validator");

exports.createRoomType = async (req, res, next) => {
  try {
    const { error } = createRoomTypeValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const roomType = await RoomTypeService.createRoomType(req.body);
    res.status(201).json(roomType);
  } catch (error) {
    next(error);
  }
};

exports.getAllRoomTypes = async (req, res, next) => {
  try {
    const roomTypes = await RoomTypeService.getAllRoomTypes();
    res.status(200).json(roomTypes);
  } catch (error) {
    next(error);
  }
};

exports.getRoomTypeById = async (req, res, next) => {
  try {
    const roomType = await RoomTypeService.getRoomTypeById(req.params.id);
    res.status(200).json(roomType);
  } catch (error) {
    next(error);
  }
};

exports.updateRoomType = async (req, res, next) => {
  try {
    const { error } = updateRoomTypeValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const roomType = await RoomTypeService.updateRoomType(
      req.params.id,
      req.body
    );
    res.status(200).json(roomType);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoomType = async (req, res, next) => {
  try {
    const result = await RoomTypeService.deleteRoomType(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
