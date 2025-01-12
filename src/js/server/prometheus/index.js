const {
  errorHandler,
  notFoundHandler,
  logHandler,
  asyncHandler,
  corsHandler,
} = require("exhandlers");
const express = require("express");
const client = require("prom-client");

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const origins = process.env.ORIGINS;

const server = express();

// init prometheus
const register = new client.Registry();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

server.use(express.json());
server.use(corsHandler(origins));
server.use(logHandler());

// exposing api end point for prometheus server
server.get(
  "/metrics",
  asyncHandler(async (req, res) => {
    const metrics = await register.metrics();
    res.set("Content-Type", register.contentType);
    res.send(metrics);
  }),
);

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
  console.log(`server running @ http://${hostname}:${port}`);
});
