const express = require("express");
const connect = require("./src/helpers/db.config")

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use("/api/auth", require("./src/routes/auth.route"))
app.use("/api/user", require("./src/routes/user.route"))
app.use("/api/todo", require("./src/routes/todo.route"))

app.listen(port, hostname, async () => {
  await connect();
  console.log(`server running @ http://${hostname}:${port}`);
});
