const pool = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register a user
const registerUser = async (request, reply) => {

    const connection = await pool.promise().getConnection(); // Acquire a connection from the pool
    try {
        const { email, password } = request.body;
        console.log(request.body)

        const isUserExists = 'SELECT * FROM todouser WHERE email = ?';
        const [existingUser] = await connection.query(isUserExists, [email]); // Execute the query on the connection

        if (existingUser.length) {
            return reply.code(409).send('User already exists');
        }
        console.log(`ya samma aayo 1`)

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`ya samma aayo 2`)

        const query = 'INSERT INTO todouser (email, password) VALUES (?, ?)';
        const [rows] = await connection.query(query, [email, hashedPassword]); // Execute the query on the connection

        const user = { id: rows.insertId, email };
        const token = jwt.sign(user, "mySecretKey");
        reply.code(201).send({ token });

    } catch (error) {
        console.log('Error executing the query', error)
        reply.code(500).send('Internal Server Error')
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
}


module.exports = {
    registerUser
};