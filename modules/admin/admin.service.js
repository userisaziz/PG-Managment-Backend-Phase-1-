const adminModel = require("./admin.model");
const { Response } = require("../../helper/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.doRegister = async (payload) => {
  const hash = await bcrypt.hash(payload.password, 10);
  payload.password = hash;
  const result = await adminModel.create(payload);
  if (result) return Response(true, "succesfully registered user", result);
  return Response(false, "registration failed");
};

exports.doLogin = async (payload) => {
  const result = await adminModel.findOne({ email: payload.email });
  if (!result) return res.send("invalid user!");
  const compare = await bcrypt.compare(payload.password, result.password);

  if (!compare) return res.send("invalid password");

  const token = await jwt.sign(
    { email: result.email },
    process.env.jwt_sercret,
    {
      expiresIn: 60 * 60,
    }
  );
  return res.send({ result, token });
};
