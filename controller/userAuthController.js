const pool = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register a user
const registerUser = async (request, reply) => {
  const connection = await pool.promise().getConnection(); // Acquire a connection from the pool
  try {
    const { email, password } = request.body;
    console.log(request.body);

    const isUserExists = "SELECT * FROM todouser WHERE email = ?";
    const [existingUser] = await connection.query(isUserExists, [email]); // Execute the query on the connection

    if (existingUser.length) {
      return reply.code(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO todouser (email, password) VALUES (?, ?)";
    const [rows] = await connection.query(query, [email, hashedPassword]); // Execute the query on the connection

    reply.code(201).send("User registered successfully");
  } catch (error) {
    console.log("Error executing the query", error);
    reply.code(500).send("Internal Server Error");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const loginUser = async (request, reply) => {
  const connection = await pool.promise().getConnection(); // Acquire a connection from the pool

  try {
    const { email, password } = request.body;

    const query = "SELECT * FROM todouser WHERE email = ?";
    const [rows] = await connection.query(query, [email]); // Execute the query on the connection

    if (!rows.length) {
      return reply.code(401).send("User not found");
    }

    const user = rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return reply.code(401).send("Incorrect password");
    }

    // Store the user ID in the session
    request.session.userId = user.id;

    reply.code(200).send("Login successful");
  } catch (error) {
    console.error("Error executing the query", error);
    reply.code(500).send("Internal Server Error");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const logoutUser = async (request, reply) => {
  try {
    await request.session.destroy();
    reply.code(200).send("Logout successful");
  } catch (error) {
    console.error("Error logging out user", error);
    reply.code(500).send("Internal Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
