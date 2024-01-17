const roomModel = require("./room.model");
module.exports.doCreateRoom = async (body) => {
  try {
    const room = await roomModel.create(body);
    if(room)
    return { status: 200, message: "Room created successfully", data: room };
  } catch (error) {
    throw error;
  }
};

module.exports.doGetAllRoom = async (query) => {
  try {
    const hostel = await roomModel.find(query);
    if (!hostel) throw new NotFound("room not found");
    return { status: 200, message: "room fetch successfully", data: hostel };
  } catch (error) {
    throw error;
  }
};
