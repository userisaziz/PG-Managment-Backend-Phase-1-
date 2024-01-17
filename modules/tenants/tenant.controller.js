const { BadRequest } = require("../../utils/errorHandling");
const tenant_services = require("./tenant.service");
const validator = require('./tenant.validator')
module.exports.createTenant = async (req, res, next) => {
  try {
    const {error} = validator.createTenantValidator.validate(req.body)
    if(error){
      throw new BadRequest(`validation failed ${error.details[0].message}`)
    }
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
