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

const httpRequests = new client.Counter({
  name: "http_requests",
  help: "Total number of http requests processed",
  labelNames: ["method", "status", "route"],
  registers: [register],
});

const activeRequests = new client.Gauge({
  name: "http_active_requests",
  help: "Number of active http requests",
  registers: [register],
});

const requestDuration = new client.Histogram({
  name: "http_requests_duration",
  help: "Duration of http requests",
  buckets: [0.1, 0.3, 0.5, 1, 2, 5, 10],
  labelNames: ["method", "status", "route"],
  registers: [register],
});

const requestErrors = new client.Counter({
  name: "http_requests_errors",
  help: "Total http request errors",
  labelNames: ["method", "status", "route"],
  registers: [register],
});

server.use(express.json());
server.use(corsHandler(origins));
server.use(logHandler());

server.use((req, res, next) => {
  res.on("finish", () => {
    httpRequests.inc({
      method: req.method,
      status: res.statusCode,
      route: req.url,
    });
  });
  next();
});

server.use((req, res, next) => {
  activeRequests.inc();
  res.on("finish", () => {
    activeRequests.dec();
  });
  next();
});

server.use((req, res, next) => {
  const end = requestDuration.startTimer();
  res.on("finish", () => {
    end({ method: req.method, status: res.statusCode, route: req.url });
  });
  next();
});

server.use((req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      requestErrors.inc({
        method: req.method,
        status: res.statusCode,
        route: req.url,
      });
    }
  });
  next();
});

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
