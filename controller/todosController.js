const pool = require('../config/config');

// get all todos
const getTodos = async (request, reply) => {
    try {
        const connection = await pool.promise().getConnection(); // Acquire a connection from the pool
        const [rows] = await connection.query('SELECT * FROM todos'); // Execute the query on the connection
        connection.release(); // Release the connection back to the pool

        if (!rows.length) {
            return reply.code(404).send('No todos found');
        }

        reply.code(200).send(rows);
    } catch (error) {
        console.error('Error executing the query', error);
        reply.code(500).send('Internal Server Error');
    }
};

module.exports = {
    getTodos
};
