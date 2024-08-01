const calc = require("./src/calc");
const server = require("./src/webServer");
const writeToFile = require("./src/writeToFile");
const debug = require("./src/debug");
const supportsColor = require("./src/supportsColor");

function runServer() {
  const hostname = process.env.HOSTNAME;
  const port = process.env.PORT;

  server.listen(port, hostname, () => {
    console.log(`server > http://${hostname}:${port}`);
  });
}

function runCalc() {
  const sum = calc.add();
  console.log(sum);
}

function runWrite() {
  writeToFile(exports ,"exports.json");
}

function runDebug() {
  debug();
}

function runSupportsColor(){
    supportsColor();
}

// runServer();
// runCalc();
//runWrite();
//runDebug();
// runSupportsColor();



// statement 1

// promise 1

// statement 2
