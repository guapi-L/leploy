var http = require('http');

var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('ok3ay1aa1111111122223223322222211111111');
});

proxy.listen(10071, function(err) {
  if(err) proxy.listen(10071);
});
console.log('server run');