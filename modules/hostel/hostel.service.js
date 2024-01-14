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
module.exports.doGetHostel = async (id) => {
  try {
    const hostel = await hostelModel.findById(id);
    // console.log(hostel.data);
    if (!hostel) throw new NotFound("hostel not found");
    return { status: 200, message: "Hostel fetch successfully", data: hostel };
  } catch (error) {
    throw error;
  }
};
