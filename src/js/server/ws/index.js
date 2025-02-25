const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.json({ message: "normal http req" });
});

io.on("connection", (socket) => {
  console.log("ws request");
  socket.on("event", (res) => {
    console.log("event recieved: ", res);
  });
});

server.listen(5000, () => {
  console.log("server running on 5000");
});
