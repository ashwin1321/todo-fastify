const fastify = require('fastify')();

async function todoRoutes(fastify, options) {
    fastify.get('/todos', async (request, reply) => {
        console.log('GET /todos');
        reply.send({ hello: 'world' });
    });

    fastify.post('/todos', async (request, reply) => {
        console.log('POST /todos');
        reply.send({ hello: 'world' });
    });

    fastify.put('/todos', async (request, reply) => {
        console.log('PUT /todos');
        reply.send({ hello: 'world' });
    });

    fastify.delete('/todos', async (request, reply) => {
        console.log('DELETE /todos');
        reply.send({ hello: 'world' });
    });
}

module.exports = todoRoutes;