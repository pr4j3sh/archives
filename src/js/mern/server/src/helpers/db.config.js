const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connect;
