const router = require("express").Router();
const _controller = require("./room.controller");
router.post("/", _controller.createRoom);
router.get("/all", _controller.getAllRoom);
router.get("/:id", _controller.getRoom);
module.exports = router;
