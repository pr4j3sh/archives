const calc = require("./src/calc");
const server = require("./src/web-server");

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

server.listen(port, hostname, () => {
  console.log(`server > http://${hostname}:${port}`);
});

const sum = calc.add();
console.log(sum);
