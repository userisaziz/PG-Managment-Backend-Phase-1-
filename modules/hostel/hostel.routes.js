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
router.post("/add-floor", hostelController.addFloorToHostel);
router.post("/remove-floor", hostelController.removeFloorFromHostel);

router.post("/addRoomToFloor", hostelController.addRoomToFloor);
router.post("/removeRoomFromFloor", hostelController.removeRoomFromFloor);

module.exports = router;
