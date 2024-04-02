const RoomService = require("./room.service");
const RoomType = require("../roomType/roomType.model");
const { BadRequest, NotFound } = require("../../utils/errorHandling");
const {
  createRoomValidator,
  updateRoomValidator,
  bookRoomValidator,
} = require("./room.validator");
const TenantService = require("../tenants/tenant.service");

exports.createRoom = async (req, res, next) => {
  try {
    if (!req.body.roomId) {
      throw new BadRequest("Missing 'roomId' field in the request body");
    }

    const { error } = createRoomValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }
    const data = req.body;
    const { roomTypeId, ...roomData } = req.body;

    const type = await RoomType.findById(roomTypeId);
    if (!type) {
      throw new BadRequest("Invalid room type");
    }

    roomData.maxOccupancy = type.maxOccupancy;
    roomData.currentOccupancy = 0; // Initialize current occupancy

    const room = await RoomService.createRoom(data);
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomService.getAllRooms();
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

    const type = await RoomType.findById(req.body.roomType);
    if (!type) {
      throw new BadRequest("Invalid room type");
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

exports.bookRoom = async (req, res, next) => {
  try {
    const { error } = bookRoomValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const { roomId, tenantId, checkInDate, checkOutDate } = req.body;

    const room = await RoomService.getRoomById(roomId);
    if (!room) {
      throw new NotFound("Room not found");
    }

    if (room.currentOccupancy >= room.maxOccupancy) {
      throw new BadRequest("No more beds available in this room");
    }

    const tenant = await TenantService.getTenantById(tenantId);
    if (!tenant) {
      throw new NotFound("Tenant not found");
    }

    // Check if the room is already booked for the given dates
    const isBooked = await RoomService.isRoomBooked(
      roomId,
      checkInDate,
      checkOutDate
    );
    if (isBooked) {
      throw new BadRequest("Room already booked for the selected dates");
    }

    // Perform the booking
    const booking = await RoomService.bookRoom(
      roomId,
      tenantId,
      checkInDate,
      checkOutDate
    );

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};
