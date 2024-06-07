const calc = require("./src/calc");
const server = require("./src/webServer");
const writeToFile = require("./src/writeToFile");

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
  writeToFile("exports.json");
}

// runServer();
// runCalc();
runWrite();
