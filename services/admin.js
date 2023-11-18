const adminModel = require("../models/admin");
const { Response } = require("../helper/response");

exports.doRegister = async (payload) => {
  const result = await adminModel.create(payload);
  return Response(true, "succesfully registered user", result);
};
