// hostel.controller.js

const HostelService = require("./hostel.service");
const Hostel = require("./hostel.model");
const Room = require("../room/room.model");
const Floor = require("../floor/floor.model");
exports.createHostel = async (req, res, next) => {
  try {
    const hostel = await HostelService.createHostel(req.body);
    res.status(201).json(hostel);
  } catch (error) {
    next(error);
  }
};

exports.getAllHostels = async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;
    const hostels = await HostelService.getAllHostelWithDetails({
      name,
      page,
      limit,
    });
    res.status(hostels.status).json(hostels);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getHostelById = async (req, res, next) => {
  try {
    const hostel = await HostelService.getHostelById(req.params.id);
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};

exports.updateHostel = async (req, res, next) => {
  try {
    const hostel = await HostelService.updateHostel(req.body.id, req.body);
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};

exports.deleteHostel = async (req, res, next) => {
  try {
    const result = await HostelService.deleteHostel(req.body.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
exports.addRoomToFloor = async (req, res, next) => {
  try {
    const { hostelId, floorId, roomId } = req.body;

    // Check if hostel, floor, and room exist
    const hostel = await Hostel.findById(hostelId);
    const floor = await Floor.findById(floorId);
    const room = await Room.findById(roomId);

    if (!hostel || !floor || !room) {
      return res
        .status(404)
        .json({ error: "Hostel, floor, or room not found" });
    }

    // Associate the room with the floor
    floor.rooms.push(roomId);
    await floor.save();

    res.status(200).json({ message: "Room added to floor successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to remove a room from a floor
exports.removeRoomFromFloor = async (req, res, next) => {
  try {
    const { hostelId, floorId, roomId } = req.body;

    // Check if hostel, floor, and room exist
    const hostel = await Hostel.findById(hostelId);
    const floor = await Floor.findById(floorId);
    const room = await Room.findById(roomId);

    if (!hostel || !floor || !room) {
      return res
        .status(404)
        .json({ error: "Hostel, floor, or room not found" });
    }

    // Remove the room from the floor
    const index = floor.rooms.indexOf(roomId);
    if (index !== -1) {
      floor.rooms.splice(index, 1);
      await floor.save();
    }

    res.status(200).json({ message: "Room removed from floor successfully" });
  } catch (error) {
    next(error);
  }
};
exports.addFloorToHostel = async (req, res, next) => {
  try {
    const { hostelId, floorNumber } = req.body;

    // Check if hostel exists
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    // Create a new floor
    const floor = new Floor({ floorNumber: floorNumber, hostel: hostelId });
    await floor.save();

    // Associate the floor with the hostel
    hostel.floors.push(floor._id);
    await hostel.save();

    res.status(200).json({ message: "Floor added to hostel successfully" });
  } catch (error) {
    next(error);
  }
};

exports.removeFloorFromHostel = async (req, res, next) => {
  try {
    const { hostelId, floorId } = req.body;

    // Check if hostel exists
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    // Check if the floor exists in the hostel
    const index = hostel.floors.indexOf(floorId);
    if (index !== -1) {
      hostel.floors.splice(index, 1);
      await hostel.save();

      // Delete the floor document
      await Floor.findByIdAndDelete(floorId);

      res
        .status(200)
        .json({ message: "Floor removed from hostel successfully" });
    } else {
      res.status(404).json({ error: "Floor not found in hostel" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate("floors rooms tenants");

    const analytics = hostels.reduce(
      (acc, hostel) => {
        const rooms = hostel.rooms;
        const occupiedRooms = rooms.filter((room) => room.currentOccupancy > 0);
        const totalBeds = rooms.reduce(
          (sum, room) => sum + room.maxOccupancy,
          0
        );
        const occupiedBeds = rooms.reduce(
          (sum, room) => sum + room.currentOccupancy,
          0
        );
        const monthlyIncome = hostel.tenants.reduce((sum, tenant) => {
          const latestRent =
            tenant.rentHistory.slice(-1)[0] &&
            tenant.rentHistory.slice(-1)[0].rentType === "monthly";
          return (
            sum + (latestRent ? tenant.rentHistory.slice(-1)[0].amountPaid : 0)
          );
        }, 0);
        const dailyIncome = hostel.dailyIncome; // Use the dailyIncome field
        const netIncome = hostel.netIncome; // Use the netIncome field

        acc.totalRooms += rooms.length;
        acc.occupiedRooms += occupiedRooms.length;
        acc.vacantRooms += rooms.length - occupiedRooms.length;
        acc.totalBeds += totalBeds;
        acc.occupiedBeds += occupiedBeds;
        acc.vacantBeds += totalBeds - occupiedBeds;
        acc.totalTenants += hostel.tenants.length;
        acc.monthlyIncome += monthlyIncome;
        acc.dailyIncome += dailyIncome;
        acc.netIncome += netIncome;
        acc.expenses += hostel.expenses; // Add expenses to the accumulator
        acc.revenueByHostel.push({
          hostelName: hostel.name,
          netIncome,
        });

        return acc;
      },
      {
        totalRooms: 0,
        occupiedRooms: 0,
        vacantRooms: 0,
        totalBeds: 0,
        occupiedBeds: 0,
        vacantBeds: 0,
        totalTenants: 0,
        monthlyIncome: 0,
        dailyIncome: 0,
        netIncome: 0,
        expenses: 0, // Initialize expenses in the accumulator
        revenueByHostel: [],
      }
    );

    res.status(200).json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.addExpenseToHostel = async (req, res, next) => {
  try {
    const { hostelId, amount } = req.body;
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    hostel.expenses += amount;
    await hostel.save();
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateHostelExpense = async (req, res, next) => {
  try {
    const { hostelId, amount } = req.body;
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    hostel.expenses = amount;
    await hostel.save();
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteHostelExpense = async (req, res, next) => {
  try {
    const { hostelId, amount } = req.body;
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    hostel.expenses -= amount;
    await hostel.save();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};
exports.getOverallAnalytics = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate("floors rooms tenants");

    const analytics = hostels.reduce(
      (acc, hostel) => {
        const rooms = hostel.rooms;
        const occupiedRooms = rooms.filter((room) => room.currentOccupancy > 0);
        const totalBeds = rooms.reduce(
          (sum, room) => sum + room.maxOccupancy,
          0
        );
        const occupiedBeds = rooms.reduce(
          (sum, room) => sum + room.currentOccupancy,
          0
        );
        const monthlyIncome = hostel.tenants.reduce((sum, tenant) => {
          const latestRent =
            tenant.rentHistory.slice(-1)[0] &&
            tenant.rentHistory.slice(-1)[0].rentType === "monthly";
          return (
            sum + (latestRent ? tenant.rentHistory.slice(-1)[0].amountPaid : 0)
          );
        }, 0);
        const dailyIncome = hostel.dailyIncome; // Use the dailyIncome field
        const hostelTotalIncome = monthlyIncome + dailyIncome; // Calculate total income for each hostel
        const netIncome = hostelTotalIncome - hostel.expenses; // Correct net income calculation for each hostel

        acc.totalRooms += rooms.length;
        acc.occupiedRooms += occupiedRooms.length;
        acc.vacantRooms += rooms.length - occupiedRooms.length;
        acc.totalBeds += totalBeds;
        acc.occupiedBeds += occupiedBeds;
        acc.vacantBeds += totalBeds - occupiedBeds;
        acc.totalTenants += hostel.tenants.length;
        acc.monthlyIncome += monthlyIncome;
        acc.dailyIncome += dailyIncome;
        acc.netIncome += netIncome;
        acc.expenses += hostel.expenses; // Add expenses to the accumulator
        acc.revenueByHostel.push({
          hostelName: hostel.name,
          netIncome,
          totalIncome: hostelTotalIncome // Reflect total income for each hostel individually
        });

        return acc;
      },
      {
        totalRooms: 0,
        occupiedRooms: 0,
        vacantRooms: 0,
        totalBeds: 0,
        occupiedBeds: 0,
        vacantBeds: 0,
        totalTenants: 0,
        monthlyIncome: 0,
        dailyIncome: 0,
        netIncome: 0,
        expenses: 0, // Initialize expenses in the accumulator
        revenueByHostel: [], // Initialize revenueByHostel to collect income by hostel
      }
    );

    res.status(200).json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};