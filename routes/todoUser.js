const userAuthController = require('../controller/userAuthController');

async function todoUserRoutes(fastify, options, done) {
    fastify.post('/register', userAuthController.registerUser);
    fastify.post('/login', userAuthController.loginUser);

    done();
}

module.exports = todoUserRoutes;