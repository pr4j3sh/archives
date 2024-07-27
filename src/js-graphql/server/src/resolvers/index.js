const { v4: uuid } = require("uuid");
let links = [
  {
    id: uuid(),
    description: `GraphQL tutorial`,
    url: `www.howtographql.com`,
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: uuid(),
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
  Link: {
    id: (link) => link.id,
    description: (link) => link.description,
    url: (link) => link.url,
  },
};

module.exports = resolvers;
