const path = require("path");

const config = {
  baseDir: __dirname,
  database: path.join(__dirname, "data", "users.json"),
};

module.exports = config;
