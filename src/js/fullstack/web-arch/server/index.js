const connectDb = require("./src/database/mongodb.js");

const express = require("express");
const cors = require("cors");
const { corsOptions } = require("./src/utils.js");

const server = express();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

server.use(cors(corsOptions));
server.use(express.json());

server.use("/api/auth", require("./src/routes/user.routes.js"));

server.listen(port, hostname, async () => {
  await connectDb();
  console.log(`server running @ http:${hostname}:${port}`);
});
