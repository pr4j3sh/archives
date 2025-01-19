const express = require("express");
const winston = require("winston");
const crypto = require("crypto");
const { createClient } = require("redis");
const { exit } = require("process");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const hostname = "127.0.0.1";
const port = 5000;

const server = express();
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

const client = createClient({
  url: "redis://127.0.0.1:6379",
});

client
  .connect()
  .then(() => console.log("connected to redis"))
  .catch((error) => {
    console.error(error);
    exit(1);
  });

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requests",
  standardHeaders: "draft-6",
});

server.use(express.json());
server.use(morgan("combined", { stream }));
server.use(limiter);

server.post("/api/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    const cache = await client.get(`url:${url}`);
    if (cache) {
      return res.status(200).json({
        code: cache,
      });
    }
    const hash = crypto
      .createHash("sha256")
      .update(url)
      .digest("base64url")
      .slice(0, 6);

    await client.set(`url:${url}`, hash, "EX", 3600);
    await client.set(`code:${hash}`, url, "EX", 3600);

    res.status(201).json({
      code: hash,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

server.get("/api/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const cache = await client.get(`code:${code}`);
    res.redirect(cache);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

server.delete("/api/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const url = await client.get(`code:${code}`);
    await client.del(`code:${code}`);
    await client.del(`url:${url}`);
    res.status(200).json({
      message: "url deleted",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

server.listen(port, hostname, () => {
  logger.info(`server running @ http://${hostname}:${port}`);
});
