const fastifyPlugin = require("fastify-plugin");

const validateUserLogin = async (request, reply, done) => {
  try {
    const userId = request.session.userId; // Retrieve the user ID from the session
    console.log(userId);

    if (!userId) {
      reply.code(401).send("Unauthorized");
      return;
    }

    // You can perform additional checks or validations if needed

    done(); // User is authenticated
  } catch (error) {
    console.error("Error validating user", error);
    reply.code(500).send("Internal Server Error");
  }
};

const validateUser = fastifyPlugin(validateUserLogin);
module.exports = validateUser;
