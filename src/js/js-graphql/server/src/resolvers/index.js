const { info, feed, link } = require("./query");
const { post, updateLink, deleteLink } = require("./mutation");

const resolvers = {
  Query: {
    info,
    feed,
    link,
  },
  Mutation: {
    post,
    updateLink,
    deleteLink,
  },
  Link: {
    id: (link) => link.id,
    description: (link) => link.description,
    url: (link) => link.url,
  },
};

module.exports = resolvers;
