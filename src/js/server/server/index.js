const express = require("express");

const port = 8000;
const hostname = "127.0.0.1";

const server = express();

server.use(express.json());

server.get("/api/read", (req, res) => {
  try {
    res.status(200).json({ message: "online" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

server.post("/api/create", async (req, res) => {
  try {
    const { body } = req.body;
    res.status(200).json({ message: "create", body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

server.put("/api/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    res.status(200).json({ message: "create", body, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

server.delete("/api/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: "create", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error.message}` });
  }
});

server.listen(port, hostname, () => {
  console.log(`server running @ http://${hostname}:${port}`);
});
