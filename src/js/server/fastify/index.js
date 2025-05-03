const fastify = require("fastify")({ logger: true });

fastify.get("/", (request, reply) => {
  reply.send({ message: "server online" });
});

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    fastify.log.error(err.message);
    process.exit(1);
  }
  fastify.log.info(`server running @ ${address}`);
});
