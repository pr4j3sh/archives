function info() {
  return "This is the API of a Hackernews Clone";
}

async function feed(parent, args, context) {
  const links = await context.prisma.link.findMany();
  return links;
}

async function link(parent, args, context) {
  const l = await context.prisma.link.findUnique({
    where: {
      id: args.id,
    },
  });
  return l;
}

module.exports = {
  info,
  feed,
  link,
};
