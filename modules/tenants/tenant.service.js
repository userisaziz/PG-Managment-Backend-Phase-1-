const roomModel = require("../room/room.model");
const tenantModel = require("./tenant.model");
module.exports.doCreateTenant = async (body) => {
  try {
    const tenant = await tenantModel.create(body);
    await roomModel.findByIdAndUpdate(
      body.roomId,
      {
        $inc: { bedRemaining: -1 },
        $set: { isEmpty: { $cond: [{ $eq: ['$bedRemaining', 0] }, false, true] } },
      },
      { new: true }
    );
    
 
    return {
      status: 200,
      message: "tenant created successfully",
      data: tenant,
    };
  } catch (error) {
    throw error;
  }
};
module.exports.doGetAllTenant = async () => {
  try {
    const tenant = await tenantModel.find();
    return {
      status: 200,
      message: "tenant fetched successfully",
      data: tenant,
    };
  } catch (error) {
    throw error;
  }
};
module.exports.doGetTenant = async (id) => {
  try {
    const tenant = await tenantModel.findById(id);
    return {
      status: 200,
      message: "tenant fetched successfully",
      data: tenant,
    };
  } catch (error) {
    throw error;
  }
};
