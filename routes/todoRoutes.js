const todosController = require('../controller/todosController');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', todosController.getTodos);
    fastify.post('/todos', todosController.createTodo);

    done();
}

module.exports = todoRoutes;
