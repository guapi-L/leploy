var net = require('net');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var child = null;
// createServer
net.createServer(ctx).listen(10070, function() { 
  console.log('server bound');
});

var cacheName = './cache_' + new Date().toDateString().split(' ').join('_');
var serverFile = cacheName + '/server.js';
var data = '';

function ctx(sock) { //'connection' listener
  console.log('client connected');
  // new Begin
  if(!fs.existsSync(cacheName)) {
    fs.mkdirSync(cacheName);  
  }
  sock.on('data', function(d) {

    data += d.toString();   
    // delete require.cache[path.join(__dirname , serverFile)];
    // require(serverFile);
    
    sock.write('finish');  
  });
  sock.on('end', function() {
    var _split = '\n' + data.split('\n')[1] + '\n';
    data = data.split(_split);data.shift();
    
    for(var i = 0, fileName, fileData; fileName = data[i], fileData = data[i + 1]; i += 2) {      
      fileName = path.join(cacheName + fileName);
      var _temp = path.dirname(fileName);
      console.log(fileName, ":", !fs.existsSync(_temp));
      if (!fs.existsSync(_temp)) { fs.mkdirSync(_temp); }
      fs.writeFile(path.normalize(fileName), fileData, function (err) {if (err) {throw err;} });
    }
    
    if (child) child.kill();
    child = child_process.fork(serverFile);  
    data = '';
  });
  sock.on('close', function() {
  });
  sock.on('error', function(e) {if(e){console.error(e);}});
}

