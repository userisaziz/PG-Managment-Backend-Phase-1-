const tenantModel = require("../models/tenants.model");
module.exports.doCreateTenant = async (body) => {
  const tenant = await tenantModel.create(body);

  return { status: 200, message: "tenant created successfully", data: tenant };
};
