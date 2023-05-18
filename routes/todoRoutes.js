const todosController = require('../controller/todosController');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', todosController.getTodos);

    done();
}

module.exports = todoRoutes;
