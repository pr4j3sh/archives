const express = require("express");

const server = express();

server.use((req, res, next) => {
  console.log("runs before api request");
  next();
  console.log("runs after api request");
});

server.get("/", (req, res) => {
  console.log("api request");
  res.send("api request");
});

server.listen(5000, () => {
  console.log("server running on 5000");
});
