const { NotFound } = require("../../utils/errorHandling");
const roomModel = require("./room.model");
module.exports.doCreateRoom = async (body) => {
  try {
    const room = await roomModel.create(body);
    if (room)
      return { status: 200, message: "Room created successfully", data: room };
  } catch (error) {
    throw error;
  }
};

module.exports.doGetAllRoom = async (query) => {
  try {
    const room = await roomModel.find(query);
    if (!room) throw new NotFound("room not found");
    return { status: 200, message: "room fetch successfully", data: room };
  } catch (error) {
    throw error;
  }
};
module.exports.doGetRoom = async ({ id }) => {
  try {
    const room = await roomModel.findOne({ _id: id });
    if (!room) throw new NotFound("room not found");
    return { status: 200, message: "room fetch successfully", data: room };
  } catch (error) {
    throw error;
  }
};
