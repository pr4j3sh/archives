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

module.exports = {
  logger,
  stream,
};
