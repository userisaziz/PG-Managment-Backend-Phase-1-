const roomModel = require("./room.model");
module.exports.doCreateRoom = async (body) => {
  const room = await roomModel.create(body);

  return { status: 200, message: "Room created successfully", data: room };
};
