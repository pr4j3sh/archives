const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./src/utils.js");

const server = express();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.use(cors(corsOptions));
server.use(express.json());

server.listen(port, hostname, () => {
  console.log(`server running @ http:${hostname}:${port}`);
});

