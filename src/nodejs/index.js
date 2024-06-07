const calc = require("./src/calc");
const server = require("./src/web-server");

const hostname = "127.0.0.1";
const port = 5000;

server.listen(port, hostname, () => {
  console.log(`server > http://${hostname}:${port}`);
});

const sum = calc.add();
console.log(sum);
