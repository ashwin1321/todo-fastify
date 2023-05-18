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


// Create a new todo
const createTodo = async (request, reply) => {
    try {
        const { title, completed } = request.body;
        const connection = await pool.promise().getConnection(); // Acquire a connection from the pool
        const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
        const [result] = await connection.query(query, [title, completed]); // Execute the query on the connection
        connection.release(); // Release the connection back to the pool
        const createdTodo = {
            id: result.insertId,
            title,
            completed
        };
        reply.code(201).send(createdTodo);
    } catch (error) {
        console.error('Error executing the query', error);
        reply.code(500).send('Internal Server Error');
    }
};


// update a todo
const updateTodo = async (request, reply) => {
    try {
        const { id } = request.params;
        const { title, completed } = request.body;
        const connection = await pool.promise().getConnection(); // Acquire a connection from the pool
        const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
        const [result] = await connection.query(query, [title, completed, id]); // Execute the query on the connection
        connection.release(); // Release the connection back to the pool

        if (!result.affectedRows) {
            return reply.code(404).send('Todo not found');
        }

        const updatedTodo = {
            id,
            title,
            completed
        };
        reply.code(200).send(updatedTodo);
    } catch (error) {
        console.error('Error executing the query', error);
        reply.code(500).send('Internal Server Error');
    }
};


// delete a todo
const deleteTodo = async (request, reply) => {
    try {
        const { id } = request.params;
        const connection = await pool.promise().getConnection(); // Acquire a connection from the pool

        const query = 'DELETE FROM todos WHERE id = ?';
        const [result] = await connection.query(query, [id]); // Execute the query on the connection
        connection.release(); // Release the connection back to the pool

        if (result.affectedRows === 0) {
            return reply.code(404).send('Todo not found');
        }
        reply.code(200).send('Todo deleted successfully');
    } catch (error) {
        console.error('Error executing the query', error);
        reply.code(500).send('Internal Server Error');
    }
};


module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};

