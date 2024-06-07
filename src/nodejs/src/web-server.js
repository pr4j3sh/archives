const { createServer } = require("node:http");

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.end(
    "<h1>Node.js</h1><p>Welcome to this page!</p><a href='https://nodejs.org/en/'>Explore more -></a>"
  );
});

module.exports = server;
