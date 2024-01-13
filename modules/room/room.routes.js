const router = require("express").Router();
const _controller = require("./room.controller");
router.post("/create-room", _controller.createRoom);

module.exports = router;
