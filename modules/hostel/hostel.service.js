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

exports.getAllHostelWithDetails = async (data) => {
  try {
    const hostels = await Hostel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hostel",
          as: "rooms",
        },
      },
      {
        $lookup: {
          from: "tenants",
          localField: "rooms._id",
          foreignField: "room",
          as: "tenants",
        },
      },
      {
        $addFields: {
          numOfRooms: { $size: "$rooms" },
          numOfTenants: { $size: "$tenants" },
        },
      },

      {
        $project: {
          rooms: 0, // Exclude rooms array from the result
          tenants: 0, // Exclude tenants array from the result
        },
      },
    ]);

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
