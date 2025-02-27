const mariadb = require("./database/connect/mariadb");

function main(res) {
  console.log("Main Page");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Main Page");
  res.end();
}

function login(res) {
  console.log("Login Page");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Login Page");
  res.end();
}

function owner(res) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("김종현");
  res.end();
}

let handle = {}; // key:value
handle["/"] = main;
handle["/login"] = login;
handle["/owner"] = owner;

exports.handle = handle;
