// hostel.controller.js

const HostelService = require("./hostel.service");

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
    const hostels = await HostelService.getAllHostels();
    res.status(200).json(hostels);
  } catch (error) {
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

exports.addFloor = async (req, res, next) => {
  try {
    const hostel = await HostelService.addFloor(
      req.body.id, // Pass hostel ID from payload
      req.body.floorNumber
    );
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};

exports.editFloor = async (req, res, next) => {
  try {
    const hostel = await HostelService.editFloor(
      req.body.id, // Pass hostel ID from payload
      req.body.floorId, // Pass floor ID from payload
      req.body.updatedFloorNumber
    );
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};

exports.removeFloor = async (req, res, next) => {
  try {
    const hostel = await HostelService.removeFloor(
      req.body.id, // Pass hostel ID from payload
      req.body.floorId // Pass floor ID from payload
    );
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};
