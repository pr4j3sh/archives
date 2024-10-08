const path = require("node:path");

module.exports = {
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
  },
};
