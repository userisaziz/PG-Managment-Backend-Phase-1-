// roomType.routes.js

const express = require("express");
const router = express.Router();
const roomTypeController = require("./roomType.controller");

router.post("/", roomTypeController.createRoomType);
router.get("/", roomTypeController.getAllRoomTypes);
router.get("/:id", roomTypeController.getRoomTypeById);
router.put("/:id", roomTypeController.updateRoomType);
router.delete("/:id", roomTypeController.deleteRoomType);

module.exports = router;
