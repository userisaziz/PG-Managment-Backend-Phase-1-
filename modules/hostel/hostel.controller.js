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
