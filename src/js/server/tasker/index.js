const express = require("express");
const morgan = require("morgan");
const { stream, logger } = require("./lib/utils.js");
const port = 5000;
const hostname = "127.0.0.1";

const server = express();

server.use(express.json());
server.use(morgan("combined", { stream }));

server.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "server online",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

server.use("/api", require("./routes.js"));

server.listen(port, hostname, () => {
  logger.info(`server running @ http://${hostname}:${port}`);
});
