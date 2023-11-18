const admin_services = require("../services/admin");

exports.register = async (req, res) => {
  //   const { mobileNo, email, name ,password} = req.body;
  const result = await admin_services.doRegister(req.body);
  if (result.status)
    return res
      .status(200)
      .success({ message: result.message, result: result.payload });
  return res.status(400).send({ message: "cannot register" });
};
