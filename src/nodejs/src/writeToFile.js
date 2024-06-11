const fs = require("node:fs");
const config = require("../config");


function writeToFile(data, fileName) {
  try {
    const content = JSON.stringify(data);
    fs.writeFileSync(config.baseDir + "/data/" + fileName, content);
    console.log(`${fileName} file written`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = writeToFile;
