const roomModel = require("./room.model");
module.exports.doCreateRoom = async (body) => {
  try {
    const room = await roomModel.create(body);

    return { status: 200, message: "Room created successfully", data: room };
  } catch (error) {
    throw error;
  }
};
