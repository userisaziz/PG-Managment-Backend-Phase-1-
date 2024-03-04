const { BadRequest } = require("../../utils/errorHandling");
const _services = require("./room.service");
const validator = require("./room.validator");
module.exports.createRoom = async (req, res, next) => {
  try {
    const { error } = validator.createRoomValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`validation failed ${error.details[0].message}`);
    }
    const result = await _services.doCreateRoom(req.body);
    return res.json({
      success: true,
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllRoom = async (req, res, next) => {
  try {
    const { error } = validator.getAllRoomValidator.validate(req.query);
    if (error) {
      throw new BadRequest(
        `error in getting all room validator ${error.details[0].message}`
      );
    }
    const { type, floor } = req.query;

    const query = {
      ...(type ? { roomType: type } : {}),
      ...(floor ? { floor: floor } : {}),
    };
    const result = await _services.doGetAllRoom(query);
    return res.json({
      success: true,
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.getRoom = async (req, res, next) => {
  try {
    const { error } = validator.getRoomValidator.validate(req.params);
    if (error) {
      throw new BadRequest(
        `error in getting all room validator ${error.details[0].message}`
      );
    }
    const result = await _services.doGetRoom(req.params);
    return res.json({
      success: true,
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
