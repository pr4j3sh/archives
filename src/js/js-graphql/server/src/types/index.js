const fs = require("fs");
const { schemaPath } = require("../../app.config");

const typeDefs = fs.readFileSync(schemaPath, "utf8");

module.exports = typeDefs;
