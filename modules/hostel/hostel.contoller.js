const _services = require("./hostel.service");
module.exports.createHostel = async (req, res) => {
  try {
    const result = await _services.doCreateHostel(req.body);
    return res.json({ result });
  } catch (error) {
    console.log(error);
  }
};
