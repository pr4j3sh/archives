const express = require("express");

const port = 8000;
const hostname = "127.0.0.1";

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({
    msg: `server running @ ${hostname}:${port}`,
    server: "A",
  });
});

server.listen(port, hostname, () => {
  console.log(`server running @ ${hostname}:${port}`);
});
