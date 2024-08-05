const Query = require("./query");
const Mutation = require("./mutation");
const User = require("./user");
const Link = require("./link");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

module.exports = resolvers;
