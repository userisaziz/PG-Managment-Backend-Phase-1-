const express = require("express");
const router = express.Router();
const hostelController = require("./hostel.controller");

router.get("/analytics", hostelController.getAnalytics);
router.get("/overall-analytics", hostelController.getOverallAnalytics); // New endpoint

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

// Expense management
router.post("/add-expense", hostelController.addExpenseToHostel);
router.put("/update-expense", hostelController.updateHostelExpense);
router.delete("/delete-expense", hostelController.deleteHostelExpense);

module.exports = router;