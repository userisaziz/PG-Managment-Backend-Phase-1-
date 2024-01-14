const _services = require("./room.service");
module.exports.createRoom = async (req, res, next) => {
  try {
    const result = await _services.doCreateRoom(req.body);
    return res.json({
      success: true,
      status: result.status,
      message: result.message,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
