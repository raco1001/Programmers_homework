   const mysql = require('mysql2');

  const connection = mysql.createConnection({
    host: '218.234.14.81',
    user: 'root',
    database: 'Youtube',
    port: 3307,
    password: 'root',
  });

  module.exports = connection;