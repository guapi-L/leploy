var http = require('http');

var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('try');
});

proxy.listen(10071);
console.log('server run');