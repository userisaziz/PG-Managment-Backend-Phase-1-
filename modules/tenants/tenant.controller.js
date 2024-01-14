const tenant_services = require("./tenant.service");
module.exports.createTenant = async (req, res, next) => {
  try {
    const result = await tenant_services.doCreateTenant(req.body);
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
