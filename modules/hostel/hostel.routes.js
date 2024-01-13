const router = require("express").Router();
const _controller = require("./hostel.contoller");
router.post("/create-hostel", _controller.createHostel);

module.exports = router;
