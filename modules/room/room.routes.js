const router = require("express").Router();
const _controller = require("./room.controller");
router.post("/", _controller.createRoom);
router.get("/all-room", _controller.getAllRoom);
module.exports = router;
