const express = require("express");

const port = 8000;

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({ message: "server online" });
});

server.listen(port, function () {
  console.log(`server running on ${port}`);
});
