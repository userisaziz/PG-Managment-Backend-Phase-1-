const adminModel = require("./admin.model");
const { Response } = require("../../helper/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BadRequest } = require("http-errors");

exports.doRegister = async (payload) => {
  try {
    const userDetails = await adminModel.findOne({
      $or: [{ mobileNo: payload.mobileNo }, { email: payload.email }],
    });
    if (userDetails) return Response(false, "Admin already exists!");

    const hash = await bcrypt.hash(payload.password, 10);
    payload.password = hash;
    const result = await adminModel.create(payload);
    return Response(true, "Successfully registered user", result);
  } catch (error) {
    throw error;
  }
};

exports.doLogin = async (payload) => {
  try {
    const result = await adminModel.findOne({ email: payload.email });
    if (!result) throw new BadRequest("Invalid user!");

    const compare = await bcrypt.compare(payload.password, result.password);
    if (!compare) throw new BadRequest("Invalid password");

    const token = await jwt.sign(
      { email: result.email },
      process.env.jwt_sercret,
      {
        expiresIn: 60 * 60,
      }
    );
    return Response(true, "Successfully registered user", { result, token });
  } catch (error) {
    throw error;
  }
};
