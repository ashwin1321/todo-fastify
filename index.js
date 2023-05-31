const fastify = require("fastify")({ logger: true });
const fastifyCookie = require("@fastify/cookie");
const session = require("@fastify/session");
const { db } = require("./config/config");
const todoRoutes = require("./routes/todoRoutes");
const todoUser = require("./routes/todoUser");

// Register fastify-cookie plugin
fastify.register(fastifyCookie);

// register fastify session
fastify.register(session, {
  secret: "my-super-secret-key-with-a-length-of-32-or-more-characters", // replace by a secret string
  cookie: {
    secure: false, // set this to false for local development (unless you're using https)
    maxAge: 86400000, // 1 day in ms
  },
  saveUninitialized: false,
});

// register routes
fastify.register(todoRoutes, { prefix: "/api" });
fastify.register(todoUser, { prefix: "/auth" });

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error("Error starting the server", err);
    process.exit(1);
  }
  console.log("Server listening on port 3000");
});
