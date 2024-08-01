const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middlewares/error.middleware");

const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./src/routes/auth.routes"));

app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
