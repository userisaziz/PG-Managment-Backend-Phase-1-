const router = require("express").Router();
const _controller = require("./hostel.contoller");
router.post("/create-hostel", _controller.createHostel);
router.get('/all-hostel',_controller.getAllHostel)
router.get("/:id", _controller.getHostel);
module.exports = router;


