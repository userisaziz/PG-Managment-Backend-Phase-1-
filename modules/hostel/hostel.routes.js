// hostel.routes.js

const express = require("express");
const router = express.Router();
const hostelController = require("./hostel.controller");

// CRUD operations for hostels
router.post("/create-hostel", hostelController.createHostel);
router.get("/all-hostels", hostelController.getAllHostels);
router.get("/:id", hostelController.getHostelById);
router.put("/edit-hostel", hostelController.updateHostel);
router.delete("/delete-hostel", hostelController.deleteHostel);

// Floor management
router.post("/hostels/floors/add", hostelController.addFloor);
router.put("/hostels/floors/edit", hostelController.editFloor);
router.delete("/hostels/floors/remove", hostelController.removeFloor);

module.exports = router;
