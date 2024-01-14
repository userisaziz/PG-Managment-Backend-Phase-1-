const _services = require("./hostel.service");
module.exports.createHostel = async (req, res, next) => {
  try {
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
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
