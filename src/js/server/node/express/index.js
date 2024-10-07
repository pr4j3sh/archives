const express = require("express");

const port = process.env.PORT;
const hostname = "127.0.0.1";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "online" });
});

server.post("/", async (req, res) => {
  try {
    const { name } = await req.body;
    console.log(name);
    res.status(200).json({ message: "recieved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
