const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return { message: "server online" };
    },
  });

  server.route({
    method: "GET",
    path: "/query",
    handler: (request, h) => {
      const { page, limit } = request.query;

      return {
        message: "query",
        page,
        limit,
      };
    },
  });

  server.route({
    method: "POST",
    path: "/params/{param}",
    handler: (request, h) => {
      const { param } = request.params;

      return {
        message: "params",
        param,
      };
    },
  });

  await server.start();
  console.log(`server running @ ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exit(1);
});

init();
