var http = require('http');

var proxy = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
<<<<<<< HEAD
  res.end('ok3ay1aa1111111122223223322222211111111');
=======
  res.end('try');
>>>>>>> origin/master
});

proxy.listen(10071, function(err) {
  if(err) proxy.listen(10071);
});
console.log('server run');