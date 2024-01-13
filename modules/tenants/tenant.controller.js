const tenant_services = require("./tenant.service");
module.exports.createTenant = async (req, res) => {
  try {
    const result = await tenant_services.doCreateTenant(req.body);
    return res.json({ result });
  } catch (error) {
    console.log(error);
  }
};
