const admin_services = require("./admin.service");
const validator = require("./admin.validator");
const { BadRequest } = require("../../utils/errorHandling");

exports.register = async (req, res, next) => {
  try {
    const { error } = validator.registerValidator.validate(req.body);
    if (error) {
      console.log("error from validation", error.details[0].message);
      throw new BadRequest(
        `Validation error while hostel creation ${error.details[0].message}`
      );
    }

    const result = await admin_services.doRegister(req.body);
    if (result.status)
      return res
        .status(200)
        .send({ message: result.message, result: result.payload });

    return res.status(400).send({
      status: result?.status,
      message: result?.message ? result.message : "Cannot register",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await admin_services.doLogin(req.body);
    if (result.status)
      return res
        .status(200)
        .send({ message: result.message, result: result.payload });
    return res.status(400).send({ message: result.message });
  } catch (error) {
    next(error);
  }
};
