const Room = require("./room.model");
const { NotFound } = require("../../utils/errorHandling");

exports.createRoom = async (data) => {
  try {
    const room = await Room.create(data);
    return {
      status: 200,
      message: "Room created successfully",
      data: room,
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    if (!rooms.length) {
      throw new NotFound("Rooms not found");
    }
    return {
      status: 200,
      message: "Rooms fetched successfully",
      data: rooms,
    };
  } catch (error) {
    throw error;
  }
};

exports.getRoomById = async (id) => {
  try {
    const room = await Room.findById(id);
    if (!room) {
      throw new NotFound("Room not found");
    }
    return {
      status: 200,
      message: "Room fetched successfully",
      data: room,
    };
  } catch (error) {
    throw error;
  }
};

exports.updateRoom = async (id, data) => {
  try {
    const room = await Room.findByIdAndUpdate(id, data, { new: true });
    if (!room) {
      throw new NotFound("Room not found");
    }
    return {
      status: 200,
      message: "Room updated successfully",
      data: room,
    };
  } catch (error) {
    throw error;
  }
};

exports.deleteRoom = async (id) => {
  try {
    const result = await Room.findByIdAndDelete(id);
    if (!result) {
      throw new NotFound("Room not found");
    }
    return {
      status: 200,
      message: "Room deleted successfully",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

exports.isRoomBooked = async (roomId, checkInDate, checkOutDate) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new NotFound("Room not found");
    }

    const bookings = room.bookings || [];

    // Check if any booking overlaps with the given dates
    for (const booking of bookings) {
      if (
        (checkInDate >= booking.checkInDate &&
          checkInDate <= booking.checkOutDate) ||
        (checkOutDate >= booking.checkInDate &&
          checkOutDate <= booking.checkOutDate) ||
        (checkInDate <= booking.checkInDate &&
          checkOutDate >= booking.checkOutDate)
      ) {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw error;
  }
};

exports.bookRoom = async (roomId, tenantId, checkInDate, checkOutDate) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new NotFound("Room not found");
    }

    // Add booking details to the room
    room.bookings.push({
      tenantId,
      checkInDate,
      checkOutDate,
    });

    await room.save();

    return {
      status: 200,
      message: "Room booked successfully",
      data: room,
    };
  } catch (error) {
    throw error;
  }
};
