const express = require("express");
const router = express.Router();
const roomController = require("./room.controller");

router.post("/create-room", roomController.createRoom);
router.get("/all-rooms", roomController.getAllRooms);
// router.get("/all-rooms-details", roomController.getAllRoomsWithDetails);

router.get("/:id", roomController.getRoomById);
router.put("/", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

module.exports = router;