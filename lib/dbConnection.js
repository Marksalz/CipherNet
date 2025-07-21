import mysql from 'mysql2/promise';
import { createUsersTableQuery } from './queries.js';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ciphernet',
    port: process.env.DB_PORT || 3306
};

//const connection = await mysql.createConnection(dbConfig);
const pool = mysql.createPool(dbConfig);

// Database connection and initialization
export const connectToDB = async () => {
    try {
        // Test the connection
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();

        // Create tables if they don't exist
        await pool.execute(createUsersTableQuery);
        console.log('Database tables initialized');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        throw error;
    }
};

//export default connection;

export default pool;