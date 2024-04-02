// roomType.service.js

const RoomType = require("./roomType.model");

async function createRoomType(roomTypeData) {
  return await RoomType.create(roomTypeData);
}

async function getAllRoomTypes() {
  return await RoomType.find();
}

async function getRoomTypeById(id) {
  return await RoomType.findById(id);
}

async function updateRoomType(id, roomTypeData) {
  return await RoomType.findByIdAndUpdate(id, roomTypeData, { new: true });
}

async function deleteRoomType(id) {
  return await RoomType.findByIdAndDelete(id);
}

module.exports = {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType,
};
