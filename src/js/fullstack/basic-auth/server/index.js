const express = require("express");
const cors = require("cors");

const port = 5000;
const db = new Map();
const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  console.log(db);
  res.status(200).json({
    message: "server online",
  });
});

server.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (db.has(username))
    return res.status(409).json({ message: "user already registered" });

  db.set(username, password);

  res.status(201).json({
    message: "user registered",
  });
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!db.has(username))
    return res.status(404).json({ message: "user does not exist" });

  const userPassword = db.get(username);

  if (userPassword === password)
    return res.status(200).json({ message: "user logged in" });

  res.status(401).json({ message: "invalid credentials" });
});

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Basic ")) {
    return res.status(401).json({
      message: "unauthenticated",
    });
  }
  const [username, password] = header.split(" ")[1].split(":");

  if (!db.has(username))
    return res.status(404).json({ message: "user does not exist" });

  const userPassword = db.get(username);

  if (userPassword !== password) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  req.user = username;
  next();
}

server.get("/profile", auth, (req, res) => {
  const username = req.user;

  const password = db.get(username);

  res.status(200).json({
    message: "user profile",
    data: {
      username,
      password,
    },
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
