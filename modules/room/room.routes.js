const router = require("express").Router();
const _controller = require("./room.controller");
router.post("/create-room", _controller.createRoom);
router.get("/",_controller.getAllRoom)
module.exports = router;
