const express = require("express");

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const server = express();

server.use("/", (req, res) => {
  res.json({ message: "server is online" });
});

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
