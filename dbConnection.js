import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'classicmodels',
    port: process.env.DB_PORT || 3306
};

//const connection = await mysql.createConnection(dbConfig);
const pool = mysql.createPool(dbConfig);

//export default connection;

export default pool;