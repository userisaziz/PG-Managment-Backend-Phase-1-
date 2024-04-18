const Room = require("./room.model");
const { NotFound } = require("../../utils/errorHandling");
const Floor = require("../floor/floor.model");
const RoomType = require("../roomType/roomType.model");
const Hostel = require("../hostel/hostel.model");

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

exports.getAllRoomsWithDetails = async (
  hostelId,
  floorNumber,
  roomNumber,
  occupancyStatus
) => {
  try {
    // Define the match object to filter based on the provided parameters
    const match = {};
    if (hostelId) {
      match.hostel = mongoose.Types.ObjectId(hostelId);
    }
    if (floorNumber) {
      match.floorId = mongoose.Types.ObjectId(floorNumber);
    }
    if (roomNumber) {
      match.roomNo = roomNumber;
    }
    console.log("Match object:", match);
    // Define the occupancy status filter
    let occupancyFilter = {};
    if (occupancyStatus === "Empty") {
      occupancyFilter = { $expr: { $eq: ["$currentOccupancy", 0] } };
    } else if (occupancyStatus === "Occupied") {
      occupancyFilter = {
        $expr: { $eq: ["$currentOccupancy", "$maxOccupancy"] },
      };
    } else if (occupancyStatus === "PartiallyOccupied") {
      occupancyFilter = {
        $expr: {
          $and: [
            { $gt: ["$currentOccupancy", 0] },
            { $lt: ["$currentOccupancy", "$maxOccupancy"] },
          ],
        },
      };
    }
    const rooms = await Room.aggregate([
      {
        $lookup: {
          from: "tenants",
          localField: "tenants",
          foreignField: "_id",
          as: "tenants",
        },
      },
      {
        $lookup: {
          from: "hostels",
          localField: "hostel",
          foreignField: "_id",
          as: "hostel",
        },
      },
      {
        $match: match, // Apply the filtering based on provided parameters
      },
      {
        $addFields: {
          occupancyStatus: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$currentOccupancy", 0] },
                  then: "Fully Empty",
                },
                {
                  case: { $eq: ["$currentOccupancy", "$maxOccupancy"] },
                  then: "Fully Occupied",
                },
              ],
              default: "Partially Occupied",
            },
          },
        },
      },
      {
        $match: occupancyFilter, // Apply occupancy status filter
      },
      {
        $project: {
          tenants: 0,
          hostel: 0,
        },
      },
    ]);

    if (!rooms || rooms.length === 0) {
      return {
        status: 200,
        message: "No rooms found matching the provided parameters",
        data: [],
      };
    }

    return {
      status: 200,
      message: "Rooms fetched successfully",
      data: rooms,
    };
  } catch (error) {
    console.error("Error while fetching rooms:", error);
    throw new Error("Error while fetching rooms");
  }
};
