const jwt = require('jsonwebtoken');
const fastifyPlugin = require('fastify-plugin');

const validateUserLogin = async (request, reply, done) => {
    try {
        const token = request.headers.authorization;   // Get the token from header

        if (!token) {
            reply.code(401).send("Unauthorized");
            return;
        }

        const validToken = jwt.verify(token, "mySecretKey"); // Verify the token
        if (validToken) {
            done();
        }
    } catch (error) {
        console.error("Error validating user", error);
        reply.code(401).send("Unauthorized");
    }
};

const validateUser = fastifyPlugin(validateUserLogin);
module.exports = validateUser;