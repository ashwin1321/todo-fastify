const schemas = require('../schemas/todoSchema');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', schemas.getTodosOpts);
    fastify.post('/todos', schemas.createTodoOpts);
    fastify.put('/todos/:id', schemas.updateTodoOpts);
    fastify.delete('/todos/:id', schemas.deleteTodoOpts);

    done();
}

module.exports = todoRoutes;
