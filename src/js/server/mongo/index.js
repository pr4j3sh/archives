const { mongoose } = require("mongoose");
const { exit } = require("process");

async function initMongo(uri) {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongo db");
  } catch (error) {
    console.error(error);
    exit(1);
  }
}

initMongo(process.env.MONGO_URI);
