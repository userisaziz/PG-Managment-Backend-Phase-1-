const TenantService = require("./tenant.service");
const RoomService = require("../room/room.service");
const { BadRequest } = require("../../utils/errorHandling");
const {
  createTenantValidator,
  updateTenantValidator,
  paramsIdValidator,
} = require("./tenant.validator");
const Room = require("../room/room.model");
exports.createTenant = async (req, res, next) => {
  try {
    const { error } = createTenantValidator.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    let room = await RoomService.getRoomById(req.body.roomId);
    if (!room) {
      throw new BadRequest("Invalid room ID");
    }

    if (room.currentOccupancy >= room.maxOccupancy) {
      throw new BadRequest("No more beds available in this room");
    }

    const tenant = await TenantService.createTenant(req.body);

    // Adjust current occupancy of the room
    room.currentOccupancy += 1;

    // If room is not a Mongoose document, convert it to one
    if (!room.save) {
      room = new Room(room);
    }

    // Save changes to the room
    await room.save();

    res.status(201).json(tenant);
  } catch (error) {
    next(error);
  }
};

exports.getAllTenants = async (req, res, next) => {
  try {
    const tenants = await TenantService.getAllTenants();
    res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
};

exports.getTenantById = async (req, res, next) => {
  try {
    const { error } = paramsIdValidator.validate(req.params);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const tenant = await TenantService.getTenantById(req.params.id);
    if (!tenant) {
      throw new BadRequest("Tenant not found");
    }
    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
};

exports.updateTenant = async (req, res, next) => {
  try {
    const { error } = paramsIdValidator.validate(req.params);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const { error: validationError } = updateTenantValidator.validate(req.body);
    if (validationError) {
      throw new BadRequest(
        `Validation error: ${validationError.details[0].message}`
      );
    }

    const { roomId, newRoomId } = req.body;

    if (newRoomId) {
      // Tenant is being moved to a different room
      const newRoom = await RoomService.getRoomById(newRoomId);
      if (!newRoom) {
        throw new BadRequest("Invalid new room ID");
      }
      if (newRoom.currentOccupancy >= newRoom.maxOccupancy) {
        throw new BadRequest("No more beds available in the new room");
      }
    }

    const tenant = await TenantService.updateTenant(req.params.id, req.body);

    // Handle room occupancy changes if the tenant is moved to a new room
    if (newRoomId) {
      const oldRoom = await RoomService.getRoomById(roomId);
      if (oldRoom) {
        oldRoom.currentOccupancy -= 1;
        await oldRoom.save();
      }
      const newRoom = await RoomService.getRoomById(newRoomId);
      newRoom.currentOccupancy += 1;
      await newRoom.save();
    }

    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
};

exports.deleteTenant = async (req, res, next) => {
  try {
    const { error } = paramsIdValidator.validate(req.params);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const tenant = await TenantService.getTenantById(req.params.id);
    if (!tenant) {
      throw new BadRequest("Tenant not found");
    }
    const room = await RoomService.getRoomById(tenant.roomId);
    if (room) {
      // Decrement current occupancy of the room
      room.currentOccupancy -= 1;
      await room.save();
    }
    const result = await TenantService.deleteTenant(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
