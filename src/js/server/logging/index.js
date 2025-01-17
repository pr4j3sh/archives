const {
  errorHandler,
  notFoundHandler,
  logHandler,
  asyncHandler,
  corsHandler,
} = require("exhandlers");
const express = require("express");
const winston = require("winston");

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const origins = process.env.ORIGINS;

const server = express();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/server.log" }),
  ],
});

const stream = {
  write: (message) => logger.info(message.trim()),
};

server.use(express.json());
server.use(corsHandler(origins));
server.use(logHandler("combined", { stream }));

server.get(
  "/api/check",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "server online",
    });
  }),
);

server.use(notFoundHandler);
server.use(errorHandler);

server.listen(port, hostname, () => {
  logger.info(`server running @ http://${hostname}:${port}`);
});
