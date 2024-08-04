const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");

async function post(parent, args, context, info) {
  const { userId } = context;
  const link = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  return link;
}

async function updateLink(parent, args, context, info) {
  const link = await context.prisma.link.update({
    where: {
      id: args.id,
    },
    data: {
      url: args.url,
      description: args.description,
    },
  });

  return link;
}

async function deleteLink(parent, args, context, info) {
  const link = await context.prisma.link.delete({
    where: {
      id: args.id,
    },
  });

  return link;
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, process.env.SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
  if (!user) throw new Error("No such user found");
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");
  const token = await jwt.sign({ userId: user.id }, process.env.SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
};
