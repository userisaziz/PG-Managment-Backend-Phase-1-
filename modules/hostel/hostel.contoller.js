const { BadRequest } = require("../../utils/errorHandling");
const _services = require("./hostel.service");
const validator = require("./hostel.validator");
module.exports.createHostel = async (req, res, next) => {
  try {
    const { error } = validator.hostelValidator.validate(req.body);
    if (error) {
      throw new BadRequest(
        `validation error while hostel creation ${error.details[0].message}`
      );
    }
    const result = await _services.doCreateHostel(req.body);
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

module.exports.getHostel = async (req, res, next) => {
  try {
    const result = await _services.doGetHostel(req.params.id);
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
module.exports.getAllHostel = async (req, res, next) => {
  try {
    const result = await _services.doGetAllHostel(req.params.id);
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
