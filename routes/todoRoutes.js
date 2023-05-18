const todosController = require('../controller/todosController');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', todosController.getTodos);
    fastify.post('/todos', todosController.createTodo);
    fastify.put('/todos/:id', todosController.updateTodo);

    done();
}

module.exports = todoRoutes;
