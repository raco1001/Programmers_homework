const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = require('./env'); 

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log(`✅ Connected to database: ${DB_NAME} (${DB_HOST}:${DB_PORT})`);

module.exports = pool;
