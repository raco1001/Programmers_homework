let http = require("http");
let url = require("url");
function start(route, handle) {
  // Handle incoming requests and route them to the appropriate handler function.
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    let queryData = url.parse(req.url, true).query;

    route(pathname, handle, res, queryData.productId);
  }

  http.createServer(onRequest).listen(8889);
}

exports.start = start;
