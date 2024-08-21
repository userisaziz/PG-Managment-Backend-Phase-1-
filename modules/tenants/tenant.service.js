const Tenant = require("./tenant.model");

async function createTenant(data) {
  try {
    const tenant = await Tenant.create(data);
    return {
      status: 200,
      message: "Tenant added successfully",
      data: tenant,
    };
  } catch (error) {
    throw error;
  }
}

exports.createTenant = createTenant;

exports.getAllTenants = async () => {
  try {
    const tenant = await Tenant.find();
    return {
      status: 200,
      message: "Tenants found successfully",
      data: tenant,
    };
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
