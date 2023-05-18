const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'todo-fastify'
});

// Promisify the pool query
pool.query = util.promisify(pool.query);

// Check if the connection is successful
const db = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed');
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections');
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused');
            }
            reject(err);
        } else {
            console.log('Database connected successfully');
            connection.release();
            resolve(pool);
        }
    });
});

module.exports = db;
