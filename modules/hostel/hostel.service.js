const hostelModel = require("./hostel.model");
module.exports.doCreateHostel = async (body) => {
  const hostel = await hostelModel.create(body);

  return { status: 200, message: "Hostel created successfully", data: hostel };
};
