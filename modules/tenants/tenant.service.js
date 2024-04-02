const Tenant = require("./tenant.model");

exports.createTenant = async (tenantData) => {
  try {
    const newTenant = new Tenant(tenantData);
    const savedTenant = await newTenant.save();
    return savedTenant;
  } catch (error) {
    throw error;
  }
};

exports.getAllTenants = async () => {
  try {
    const tenants = await Tenant.find();
    return tenants;
  } catch (error) {
    throw error;
  }
};

exports.getTenantById = async (id) => {
  try {
    const tenant = await Tenant.findById(id);
    return tenant;
  } catch (error) {
    throw error;
  }
};

exports.updateTenant = async (id, newData) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return updatedTenant;
  } catch (error) {
    throw error;
  }
};

exports.deleteTenant = async (id) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(id);
    return deletedTenant;
  } catch (error) {
    throw error;
  }
};
