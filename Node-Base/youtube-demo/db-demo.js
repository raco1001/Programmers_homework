   const mysql = require('mysql2');

  const connection = mysql.createConnection({
    host: '218.234.14.81',
    user: 'root',
    database: 'Youtube',
    port: 3307,
    password: 'root',
  });


  connection.query('SELECT * FROM `users`',(err, results, fields)=>{
      console.log(results);
      console.log(fields);
      const {id, email, name, password, created_at, updated_at, last_login, is_activated, role} = results[0];
      console.log(email);
      console.log(name);
      console.log(created_at);
  })