// hostel.service.js

const Hostel = require("./hostel.model");
const { NotFound } = require("../../utils/errorHandling");

exports.createHostel = async (data) => {
  try {
    const hostel = await Hostel.create(data);
    return {
      status: 200,
      message: "Hostel created successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllHostels = async () => {
  try {
    const hostels = await Hostel.find();
    if (!hostels.length) {
      throw new NotFound("Hostels not found");
    }
    return {
      status: 200,
      message: "Hostels fetched successfully",
      data: hostels,
    };
  } catch (error) {
    throw error;
  }
};

exports.getHostelById = async (id) => {
  try {
    const hostel = await Hostel.findById(id);
    if (!hostel) {
      throw new NotFound("Hostel not found");
    }
    return {
      status: 200,
      message: "Hostel fetched successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};

exports.updateHostel = async (id, data) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(id, data, { new: true });
    if (!hostel) {
      throw new NotFound("Hostel not found");
    }
    return {
      status: 200,
      message: "Hostel updated successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};

exports.deleteHostel = async (id) => {
  try {
    const result = await Hostel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFound("Hostel not found");
    }
    return {
      status: 200,
      message: "Hostel deleted successfully",
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

exports.addFloor = async (id, floorNumber) => {
  try {
    const hostel = await Hostel.findById(id);
    if (!hostel) {
      throw new NotFound("Hostel not found");
    }
    hostel.floors.push(floorNumber);
    await hostel.save();
    return {
      status: 200,
      message: "Floor added successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};

exports.removeFloor = async (id, floorNumber) => {
  try {
    const hostel = await Hostel.findById(id);
    if (!hostel) {
      throw new NotFound("Hostel not found");
    }
    hostel.floors = hostel.floors.filter((floor) => floor !== floorNumber);
    await hostel.save();
    return {
      status: 200,
      message: "Floor removed successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};
