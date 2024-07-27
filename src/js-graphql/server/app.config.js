const path = require("path");

const paths = {
  basePath: __dirname,
  schemaPath: path.join(__dirname, "src", "schemas", "index.graphql"),
};

module.exports = paths;
