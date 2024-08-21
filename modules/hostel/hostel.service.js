// hostel.service.js

const Hostel = require("./hostel.model");
const Floor = require("../floor/floor.model");
const Tenant = require("../tenants/tenant.model");

const { NotFound } = require("../../utils/errorHandling");
exports.createHostel = async (data) => {
  try {
    const hostel = await Hostel.create(data);
    for (let i = 1; i <= hostel.numFloors; i++) {
      const floor = await Floor.create({
        hostel: hostel._id,
        floorNumber: i,
      });
      hostel.floors.push(floor._id);
    }

    await hostel.save();

    return {
      status: 200,
      message: "Hostel created successfully",
      data: hostel,
    };
  } catch (error) {
    throw error;
  }
};

exports.getAllHostelWithDetails = async () => {
  try {
    const hostelDetails = await Hostel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "rooms",
          foreignField: "_id",
          as: "rooms",
        },
      },
      {
        $lookup: {
          from: "floors",
          localField: "floors",
          foreignField: "_id",
          as: "floors",
        },
      },
      {
        $lookup: {
          from: "tenants",
          localField: "tenants",
          foreignField: "_id",
          as: "tenants",
        },
      },
      {
        $addFields: {
          totalTenants: { $size: "$tenants" },
          totalRooms: { $size: "$rooms" },
          totalBeds: { $sum: "$rooms.maxOccupancy" },
          totalFloors: { $size: "$floors" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          address: 1,
          pgType: 1,
          totalTenants: 1,
          totalRooms: 1,
          totalBeds: 1,
          totalFloors: 1,
          "rooms._id": 1,
          "rooms.roomNo": 1,
          "floors._id": 1,
          "floors.floorNumber": 1,
          "floors.rooms": 1,
        },
      },
    ]);

    if (!hostelDetails || hostelDetails.length === 0) {
      throw new NotFound("Hostel not found");
    }

    return {
      status: 200,
      message: "Hostel fetched successfully",
      data: hostelDetails,
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
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      throw new NotFound("Hostel not found");
    }

    // Remove associated floors
    await Floor.deleteMany({ hostel: hostel._id });

    // Remove associated rooms
    // Loop through rooms and delete each one
    for (const roomId of hostel.rooms) {
      await Room.findByIdAndDelete(roomId);
    }

    // Remove associated tenants
    // Loop through tenants and delete each one
    for (const tenantId of hostel.tenants) {
      await Tenant.findByIdAndDelete(tenantId);
    }

    // Delete the hostel itself
    const result = await Hostel.findByIdAndDelete(id);

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
