const schemas = require('../schemas/todoSchema');
const validateUser = require('../middlewares/validateUser');

async function todoRoutes(fastify, options, done) {
    fastify.get('/todos', { preValidation: [validateUser], schema: schemas.getTodosOpts.schema }, schemas.getTodosOpts.handler);
    fastify.post('/todos', { preValidation: [validateUser], schema: schemas.createTodoOpts.schema }, schemas.createTodoOpts.handler);
    fastify.put('/todos/:id', { preValidation: [validateUser], schema: schemas.updateTodoOpts.schema }, schemas.updateTodoOpts.handler);
    fastify.delete('/todos/:id', { preValidation: [validateUser], schema: schemas.deleteTodoOpts.schema }, schemas.deleteTodoOpts.handler);

    done();
}

module.exports = todoRoutes;
