const _services = require("./room.service");
module.exports.createRoom = async (req, res) => {
  try {
    const result = await _services.doCreateRoom(req.body);
    return res.json({ result });
  } catch (error) {
    console.log(error);
  }
};
