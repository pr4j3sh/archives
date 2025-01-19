const https = require("https");
const fs = require("fs");
const express = require("express");

const port = 5000;
const privateKey = fs.readFileSync("key.pem", "utf-8");
const certificate = fs.readFileSync("cert.pem", "utf-8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "server online",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

const server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(`server running @ https://127.0.0.1:${port}`);
});
