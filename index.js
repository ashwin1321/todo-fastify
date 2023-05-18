const fastify = require('fastify')({ logger: true });
const { db } = require('./config/config');
const todoRoutes = require('./routes/todoRoutes');

// register routes
fastify.register(todoRoutes, { prefix: '/api' });


fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error('Error starting the server', err);
        process.exit(1);
    }
    console.log('Server listening on port 3000');
});
