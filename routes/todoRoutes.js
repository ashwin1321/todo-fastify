const todosController = require('../controller/todosController');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', todosController.getTodos);
    fastify.post('/todos', todosController.createTodo);
    fastify.put('/todos/:id', todosController.updateTodo);
    fastify.delete('/todos/:id', todosController.deleteTodo);

    done();
}

module.exports = todoRoutes;
