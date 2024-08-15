const TenantService = require("./tenant.service");

const RoomService = require("../room/room.service");
const { BadRequest } = require("../../utils/errorHandling");
const {
  createTenantSchema,
  updateTenantValidator,
  paramsIdValidator,
} = require("./tenant.validator");
const Tenant = require("./tenant.model");
const Hostel = require("../hostel/hostel.model");

const { getCurrentMonthYear } = require("../../utils/getCurrentMonthYear");
exports.createTenant = async (req, res, next) => {
  console.log("req: ", req.body.roomId);
  try {
    const { error } = createTenantSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`);
    }

    // Validate date format
    const { rentedDate, hostelId, roomId, ...tenantData } = req.body;
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(rentedDate)) {
      throw new BadRequest(
        "Invalid date format. Expected format is DD-MM-YYYY"
      );
    }

    // Convert the date to a JavaScript Date object
    const [day, month, year] = rentedDate.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    tenantData.rentedDate = formattedDate;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      throw new BadRequest("Invalid hostel");
    }

    const room = await RoomService.getRoomById(roomId);
    if (!room) {
      throw new BadRequest("Invalid room ID");
    }

    if (room.data.currentOccupancy >= room.data.maxOccupancy) {
      throw new BadRequest("No more beds available in this room");
    }

    // Update current occupancy
    room.data.currentOccupancy += 1;
    await room.data.save();

    const tenant = await TenantService.createTenant({
      ...tenantData,
      roomId,
      hostelId,
    });
    room.data.tenants.push(tenant.data._id);
    await room.data.save();

    hostel.tenants.push(tenant.data._id);
    await hostel.save();
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
      await room.data.save();
    }
    const result = await TenantService.deleteTenant(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.markRentPaid = async (req, res) => {
  const { tenantId, amountPaid, month, year } = req.body;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentYear = currentDate.getFullYear();

  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const rentedDate = new Date(tenant.rentedDate);
    const rentedMonth = rentedDate.getMonth() + 1;
    const rentedYear = rentedDate.getFullYear();

    // Validate the month and year
    if (
      year < rentedYear ||
      (year === rentedYear && month < rentedMonth) ||
      year > currentYear ||
      (year === currentYear && month > currentMonth)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid month or year for rent payment" });
    }

    const existingEntry = tenant.rentHistory.find(
      (entry) => entry.month === month && entry.year === year
    );

    if (existingEntry) {
      if (existingEntry.amountPaid > 0) {
        return res.status(400).json({
          error: "Rent has already been paid for this month",
        });
      } else {
        existingEntry.amountPaid = amountPaid;
        existingEntry.date = currentDate;
      }
    } else {
      tenant.rentHistory.push({
        month,
        year,
        amountPaid,
        date: currentDate,
      });
    }

    await tenant.save();
    res.status(200).json({
      message: "Rent marked as paid",
      month,
      year,
      date: currentDate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTenantsWithOverduePayments = async (req, res) => {
  try {
    const tenants = await Tenant.find();

    const tenantsWithOverduePayments = tenants.map((tenant) => {
      const rentedDate = new Date(tenant.rentedDate);
      const currentDate = new Date();
      const monthsSinceRented =
        (currentDate.getFullYear() - rentedDate.getFullYear()) * 12 +
        (currentDate.getMonth() - rentedDate.getMonth());

      const lastPaymentEntry = tenant.rentHistory.slice().sort((a, b) => {
        const dateA = new Date(a.year, a.month - 1);
        const dateB = new Date(b.year, b.month - 1);
        return dateB - dateA;
      })[0];

      const lastPaymentMonth = lastPaymentEntry
        ? `${lastPaymentEntry.month}/${lastPaymentEntry.year}`
        : "Not available";

      const monthsSinceLastPayment = lastPaymentEntry
        ? (currentDate.getFullYear() - lastPaymentEntry.year) * 12 +
          (currentDate.getMonth() - (lastPaymentEntry.month - 1))
        : monthsSinceRented;

      return {
        tenantId: tenant._id,
        monthsSinceLastPayment,
        lastPaymentMonth,
      };
    });

    const overduePayments = tenantsWithOverduePayments.filter(
      (tenant) => tenant.monthsSinceLastPayment > 1
    );

    res.status(200).json(overduePayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
