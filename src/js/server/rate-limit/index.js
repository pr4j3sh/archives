const express = require("express");

const port = 5000;
const hostname = "127.0.0.1";

const server = express();

// 10 req/min

const db = new Map();

// sliding window
server.use((req, res, next) => {
  const now = Date.now();
  const windowSize = 60 * 1000;
  const limit = 10;

  if (!db.has(req.ip)) {
    db.set(req.ip, []);
  }

  const timestamps = db.get(req.ip).filter((time) => now - time < windowSize);

  if (timestamps.length >= limit) {
    return res.status(429).json({ message: "too many requests" });
  }

  timestamps.push(now);
  db.set(req.ip, timestamps);

  next();
});

// const db = [];

// fixed window
// server.use((req, res, next) => {
//   const client = db.find((e) => e.ip === req.ip);
//   if (client) {
//     if (Date.now() - client.timestamp < 60 * 1000 && client.count < 10) {
//       client.count += 1;
//       next();
//     } else if (
//       Date.now() - client.timestamp < 60 * 1000 &&
//       client.count >= 10
//     ) {
//       return res.status(429).json({ message: "too many requests" });
//     } else if (Date.now() - client.timestamp > 60 * 1000) {
//       client.timestamp = Date.now();
//       client.count = 1;
//       next();
//     }
//   } else {
//     const user = {
//       ip: req.ip,
//       timestamp: Date.now(),
//       count: 1,
//     };
//     db.push(user);
//     next();
//   }
//   console.log(db);
// });

server.get("/", (req, res) => {
  res.json({ message: "online" });
});

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
