const {
  errorHandler,
  notFoundHandler,
  logHandler,
  asyncHandler,
  corsHandler,
} = require("exhandlers");
const express = require("express");
const os = require("os");

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const origins = process.env.ORIGINS;

const server = express();

server.use(express.json());
server.use(corsHandler(origins));
server.use(logHandler());

server.get(
  "/api/check",
  asyncHandler(async (req, res) => {
    const hostname = os.hostname();
    res.status(200).json({
      success: true,
      message: "server online",
      hostname,
    });
  }),
);

server.use(notFoundHandler);
server.use(errorHandler);

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
