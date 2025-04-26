const { Queue } = require("bullmq");
const express = require("express");

const server = express();
const q = new Queue("emailQueue");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "server online",
  });
});

server.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // hash the password
    // save the data to db
    // generate a jwt token

    // send email
    await q.add("sendEmail", { email });

    res.status(201).json({ message: "user registered" });
  } catch (error) {
    res.status(500).json({ error: true, message: "internal server error" });
  }
});

server.listen(5000, () => {
  console.log("server running @ 5000");
});
