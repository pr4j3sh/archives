const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: async (parent, args, context) => {
      return context.prisma.link.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const link = context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });

      return link;
    },
    updateLink: (parent, args, context, info) => {
      const link = context.prisma.link.update({
        where: {
          id: args.id,
        },
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return link;
    },
    deleteLink: (parent, args, context, info) => {
      const link = context.prisma.link.delete({
        where: {
          id: args.id,
        },
      });

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
