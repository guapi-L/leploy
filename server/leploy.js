var net = require('net');
var fs = require('fs');
var path = require('path');
// createServer
net.createServer(ctx).listen(10070, function() { 
  console.log('server bound');
});

var data = '';

var cacheName = 'cache_' + new Date().toDateString().split(' ').join('_');
 //fs.mkdirSync(cacheName);
var serverFile = './' + cacheName + '/server.js';

function ctx(sock) { //'connection' listener
  console.log('client connected');
  sock.on('data', function(d) {
    data += d.toString();
    console.log(data);
    fs.writeFile(serverFile, data, function (err) {
      if (err) throw err;
      delete require.cache[path.join(__dirname , serverFile)];
      require(serverFile);
      data = '';
    });
    sock.write('finish');
  });
  sock.on('end', function() {
  });
  sock.on('close', function() {
  });
  sock.on('error', function(e) {if(e){console.error(e);}});
}