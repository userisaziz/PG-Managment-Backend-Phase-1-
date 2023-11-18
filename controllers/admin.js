const admin_services = require("../services/admin");

exports.register = async (req, res) => {
  //   const { mobileNo, email, name ,password} = req.body;
  const result = await admin_services.doRegister(req.body);
  if (result.status)
    return res
      .status(200)
      .send({ message: result.message, result: result.payload });
  return res.status(400).send({ message: "cannot register" });
};

exports.login = async (req, res) => {
  const result = await admin_services.doLogin(req.body);

  if (result.status)
    return res
      .status(200)
      .send({ message: result.message, result: result.payload });

  return res.status(400).send({ message: result.message });
};
