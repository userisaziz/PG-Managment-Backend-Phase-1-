const Room = require("./room.model");
const { NotFound } = require("../../utils/errorHandling");
const Floor = require("../floor/floor.model");

const Hostel = require("../hostel/hostel.model");
const mongoose = require("mongoose");
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
  floorId,
  roomNumber,
  occupancyStatus
) => {
  try {
    const match = {};

    // Build the match object based on the provided parameters
    if (hostelId) {
      match.hostelId = new mongoose.Types.ObjectId(hostelId);
    }
    if (floorId) {
      match.floorId = new mongoose.Types.ObjectId(floorId);
    }
    if (roomNumber) {
      match.roomNo = roomNumber;
    }

    // Construct the occupancy filter based on the occupancy status
    const occupancyFilter = {};
    switch (occupancyStatus) {
      case "Empty":
        occupancyFilter.$expr = { $eq: ["$currentOccupancy", 0] };
        break;
      case "Occupied":
        occupancyFilter.$expr = { $eq: ["$currentOccupancy", "$maxOccupancy"] };
        break;
      case "PartiallyOccupied":
        occupancyFilter.$expr = {
          $and: [
            { $gt: ["$currentOccupancy", 0] },
            { $lt: ["$currentOccupancy", "$maxOccupancy"] },
          ],
        };
        break;
    }

    // Aggregate rooms with detailed information
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
          localField: "hostelId",
          foreignField: "_id",
          as: "hostel",
        },
      },
      {
        $lookup: {
          from: "floors",
          localField: "floorId",
          foreignField: "_id",
          as: "floor",
        },
      },
      {
        $match: match,
      },
      {
        $addFields: {
          hostelName: { $arrayElemAt: ["$hostel.name", 0] },
          floorNumber: { $arrayElemAt: ["$floor.floorNumber", 0] },
          occupancyStatus: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$currentOccupancy", 0] },
                  then: "isEmpty",
                },
                {
                  case: { $eq: ["$currentOccupancy", "$maxOccupancy"] },
                  then: "isFullyOccupied",
                },
                {
                  case: {
                    $and: [
                      { $gt: ["$currentOccupancy", 0] },
                      { $lt: ["$currentOccupancy", "$maxOccupancy"] },
                    ],
                  },
                  then: "isPartiallyOccupied",
                },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $match: occupancyFilter,
      },
      {
        $project: {
          hostel: 0,
          floor: 0,
          tenants: 0,
        },
      },
    ]);

    // Check if no rooms were found
    if (!rooms || rooms.length === 0) {
      return {
        status: 200,
        message: "No rooms found matching the provided parameters",
        data: [],
      };
    }

    // Return the fetched rooms
    return {
      status: 200,
      message: "Rooms fetched successfully",
      data: rooms,
    };
  } catch (error) {
    // Log and throw the error for higher-level handling
    console.error("Error while fetching rooms:", error);
    throw new Error("Error while fetching rooms: " + error.message);
  }
};
