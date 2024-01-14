const tenantModel = require("./tenant.model");
module.exports.doCreateTenant = async (body) => {
  try {
    const tenant = await tenantModel.create(body);

    return {
      status: 200,
      message: "tenant created successfully",
      data: tenant,
    };
  } catch (error) {
    throw error;
  }
};
