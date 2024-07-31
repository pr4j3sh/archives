const { v4: uuid } = require("uuid");

let links = [
  {
    id: "1",
    description: `GraphQL tutorial`,
    url: `www.howtographql.com`,
  },
  {
    id: "2",
    description: `Example`,
    url: `www.example.com`,
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      return link;
    },
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
    updateLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      if (link) {
        link.url = args.url;
        link.description = args.description;
      }
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      const idx = links.indexOf(link);
      links.splice(idx, 1);
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
