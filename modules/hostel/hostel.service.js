const { NotFound } = require("../../utils/errorHandling");
const hostelModel = require("./hostel.model");
module.exports.doCreateHostel = async (body) => {
  try {
    const hostel = await hostelModel.create(body);

    return {
      status: 200,
      message: "Hostel created successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};
module.exports.doGetAllHostel = async () => {
  try {
    const hostel = await hostelModel.find();
    if (!hostel) throw new NotFound("hostel not found");
    return { status: 200, message: "Hostel fetch successfully", data: hostel };
  } catch (error) {
    throw error;
  }
};
module.exports.doGetHostel = async () => {
  try {
    const hostel = await hostelModel.find();
    if (!hostel) throw new NotFound("hostel not found");
    return { status: 200, message: "Hostel fetch successfully", data: hostel };
  } catch (error) {
    throw error;
  }
};
