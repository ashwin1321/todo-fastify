const fastify = require('fastify')({ logger: true });
const db = require('./config/config');
const todoRoutes = require('./routes/todoRoutes');

// register routes
fastify.register(todoRoutes);

// start the server
db.then(() => {
    fastify.listen({ port: 3000 }, (err) => {
        if (err) {
            console.error('Error starting the server', err);
            process.exit(1);
        }
        console.log('Server listening on port 3000');
    });
}).catch((err) => {
    console.error('Error connecting to the database', err);
    process.exit(1);
});
