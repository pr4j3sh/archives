const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const db = new Map();

io.on("connection", (socket) => {
  socket.emit("player", socket.id);
  socket.on("score", (res) => {
    const r = JSON.parse(res);
    db.set(r.player, r.score);
    let dbArray = [...db.entries()].sort((a, b) => b[1] - a[1]);
    let players = dbArray.map((a) => a[0]);
    io.emit("players", players);
  });
});

server.listen(5000, () => console.log("server running on 5000"));
