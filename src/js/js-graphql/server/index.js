const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const typeDefs = require("./src/types");
const resolvers = require("./src/resolvers");
const { getUserId } = require("./src/utils");

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`server > ${url}`);
});
