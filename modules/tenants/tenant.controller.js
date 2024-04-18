const TenantService = require("./tenant.service");

const RoomService = require("../room/room.service");
const { BadRequest } = require("../../utils/errorHandling");
const {
  createTenantSchema,
  updateTenantValidator,
  paramsIdValidator,
} = require("./tenant.validator");
const Tenant = require("./tenant.model");

exports.createTenant = async (req, res, next) => {
  console.log("req: ", req.body.roomId);
  try {
    const { error } = createTenantSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    const room = await RoomService.getRoomById(req.body.roomId);
    console.log("room: ", room);

    if (!room) {
      throw new BadRequest("Invalid room ID");
    }

    if (room.data.currentOccupancy >= room.data.maxOccupancy) {
      throw new BadRequest("No more beds available in this room");
    }

    // Update current occupancy
    room.data.currentOccupancy += 1;
    await room.data.save();

    const tenant = await TenantService.createTenant(req.body);

    room.data.tenants.push(tenant.data._id);
    await room.data.save();

    res.status(201).json(tenant);
  } catch (error) {
    next(error);
  }
};

exports.getAllTenants = async (req, res, next) => {
  try {
    // Extract query parameters from request
    const { name, roomNo, floor, hostel } = req.query;

    // Call the service method to get all tenants
    let tenants = await TenantService.getAllTenants();

    // Filter the tenants based on the query parameters
    if (name) {
      tenants = tenants.filter((tenant) =>
        tenant.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (roomNo) {
      tenants = tenants.filter((tenant) => tenant.roomNo === roomNo);
    }
    if (floor) {
      tenants = tenants.filter((tenant) => tenant.floor === floor);
    }
    if (hostel) {
      tenants = tenants.filter(
        (tenant) => tenant.hostel.toLowerCase() === hostel.toLowerCase()
      );
    }

    // Send the filtered tenants as response
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

exports.markRentPayment = async (req, res) => {
  try {
    const { tenantId, amountPaid, month, year } = req.body;
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Check if there's already a payment entry for this month and year
    const isPaymentMarked = tenant.rentHistory.some(
      (payment) => payment.month === month && payment.year === year
    );
    if (isPaymentMarked) {
      return res.status(400).json({
        message: "Rent payment for this month and year is already marked",
      });
    }

    tenant.rentHistory.push({ month, year, amountPaid });
    await tenant.save();

    res.status(200).json({ message: "Rent payment marked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get tenants with overdue payments
exports.getTenantsWithOverduePayments = async (req, res) => {
  try {
    const { year, month } = req.query;
    let query = { "rentHistory.year": { $ne: year } }; // Initialize the query to find tenants who haven't paid for the given year

    // If month is provided, add month filter to the query
    if (month) {
      query["rentHistory.month"] = month;
    }

    const tenants = await Tenant.find(query);

    res.status(200).json(tenants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
