const { default: mongoose } = require("mongoose");
const winston = require("winston");

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
  }
};

const secret = "secret";

module.exports = {
  logger,
  stream,
  db,
  secret,
};
