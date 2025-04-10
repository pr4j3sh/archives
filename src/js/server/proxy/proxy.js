const express = require("express");

const port = 5000;
const target = "http://localhost:8000";

const proxy = express();

proxy.use(express.json());

proxy.use(async (req, res) => {
  try {
    const targetUrl = `${target}${req.originalUrl}`;

    const serverRes = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    const data = await serverRes.json();

    res.status(serverRes.status).json({ ...data, proxy: true });
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

proxy.listen(port, function () {
  console.log(`proxy running on ${port}`);
});
