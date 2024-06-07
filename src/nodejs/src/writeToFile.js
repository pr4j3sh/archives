const fs = require("node:fs");
const config = require("../config");

const content = JSON.stringify(exports);

function writeToFile(fileName) {
  try {
    fs.writeFileSync(config.baseDir + "/data/" + fileName, content);
    console.log(`${fileName} file written`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = writeToFile;
