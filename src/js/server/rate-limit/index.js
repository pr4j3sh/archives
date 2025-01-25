const express = require("express");
const fs = require("fs");

const port = 5000;
const hostname = "127.0.0.1";

const server = express();

server.use((req, res, next) => {
  console.log({ req });
  next();
});

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
