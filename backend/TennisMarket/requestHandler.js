const fs = require("fs");
const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderlist.html");
const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES ('" +
      productId +
      "', '" +
      new Date().toLocaleDateString() +
      "')"
  );
  response.write("Order page.");
  response.end();
}

function orderlist(response) {
  console.log("orderlist");

  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "SELECT b.id, b.name, b.description, b.price, a.order_date FROM orderlist a JOIN product b ON a.product_id = b.id ORDER BY a.order_date DESC",
    function (err, rows) {
      response.write(orderlist_view);

      rows.forEach((element) => {
        response.write(
          `<tr>
            <td>${element.id}</td>
            <td>${element.name}</td> 
            <td>${element.description}</td> 
            <td> ${element.price}</td> 
            <td>${element.order_date}</td> 
          </tr>`
        );
      });

      response.write("</table>");
      response.end();
    }
  );
}

let handle = {}; // key:value
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* image directory */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
