const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());

server.get("/api/health", (req, res) => {
  res.json({
    message: "server online",
    error: null,
    data: null,
  });
});

server.get("/api/notify", (req, res) => {
  res.json({
    message: "server online",
    error: null,
    data: null,
  });
});

server.listen(5000, () => {
  console.log(`server running @ 5000`);
});
