var http = require('http');

var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('tdasdadasdadasdry');
});

proxy.listen(10071);
console.log('server run');