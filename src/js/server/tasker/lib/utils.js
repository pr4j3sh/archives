const { default: mongoose } = require("mongoose");
const { createClient } = require("redis");
const winston = require("winston");
const { exit } = require("process");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const stream = {
  write: (message) => logger.info(message.trim()),
};

const db = async (uri) => {
  try {
    await mongoose.connect(uri);
    logger.info("connected to mongodb");
  } catch (error) {
    logger.error(error.message);
    exit(1);
  }
};

const client = createClient({ url: "redis://127.0.0.1:6379" })
  .connect()
  .then(() => {
    logger.info("connected to redis");
  })
  .catch((error) => {
    logger.error(error.message);
    exit(1);
  });

const secret = "secret";

module.exports = {
  logger,
  stream,
  db,
  client,
  secret,
};
