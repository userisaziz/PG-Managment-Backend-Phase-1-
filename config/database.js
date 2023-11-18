const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);

    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
