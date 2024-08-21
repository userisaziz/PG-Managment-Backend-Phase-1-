const RoomService = require("./room.service");

const { BadRequest, NotFound } = require("../../utils/errorHandling");
const {
  createRoomValidator,
  updateRoomValidator,
} = require("./room.validator");
const TenantService = require("../tenants/tenant.service");
const Hostel = require("../hostel/hostel.model");
const Floor = require("../floor/floor.model");
exports.createRoom = async (req, res, next) => {
  try {
    const { error } = createRoomValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }
    const { hostelId, ...roomData } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      throw new BadRequest("Invalid hostel");
    }
    const floor = await Floor.findById(req.body.floorId);
    if (!floor) {
      throw new BadRequest("Invalid floor");
    }

    // Add the hostelId to roomData
    roomData.hostelId = hostelId;

    // Create the room
    const room = await RoomService.createRoom(roomData);

    // // Associate the room with the hostel
    // hostel.rooms.push(room.data._id);
    // await hostel.save();
    // // Associate the room with the floor
    // floor.rooms.push(room.data._id);
    // await floor.save();

    // Associate the room with the hostel using $addToSet
    await Hostel.updateOne(
      { _id: hostelId },
      { $addToSet: { rooms: room.data._id } }
    );

    // Associate the room with the floor using $addToSet
    await Floor.updateOne(
      { _id: req.body.floorId },
      { $addToSet: { rooms: room.data._id } }
    );

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const { hostelId, floorId, roomNumber, occupancyStatus } = req.query;
    console.log("req.query: ", req.query);
    const rooms = await RoomService.getAllRoomsWithDetails(
      hostelId,
      floorId,
      roomNumber,
      occupancyStatus
    );

    if (rooms.status === 404) {
      return res.status(404).json({
        status: 404,
        message: "No results found for the provided parameters",
        data: [],
      });
    }

    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await RoomService.getRoomById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    if (!req.body.roomId) {
      throw new BadRequest("Missing 'roomId' field in the request body");
    }

    const { error } = updateRoomValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const room = await RoomService.getRoomById(req.body.roomId);
    if (req.body.isBedBooked) {
      if (room.currentOccupancy < room.maxOccupancy) {
        roomData.currentOccupancy = room.currentOccupancy + 1;
      } else {
        throw new BadRequest("No more beds available in this room");
      }
    }

    const updatedRoom = await RoomService.updateRoom(req.body.roomId, req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const result = await RoomService.deleteRoom(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
