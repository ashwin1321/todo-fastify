const userAuthController = require('../controller/userAuthController');

async function todoUserRoutes(fastify, options, done) {
    fastify.post('/register', userAuthController.registerUser);
    fastify.post('/login', (req, reply) => reply.send({ msg: 'login' }));

    done();
}

module.exports = todoUserRoutes;