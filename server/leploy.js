/**
 * leploy.js
 * 服务端接收协议，接收到发送端的文件请求后会对应重启服务。
 * 
 * 待修改处 (HACK:)
 */

var net = require('net');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var PORT = 10070;
var HOST = '127.0.0.1';
var child = null;

var cacheName = './cache_' + new Date().toDateString().split(' ').join('_');
var data = '';


// createServer
net.createServer(ctx).listen(PORT, HOST, function() { 
  /* init */
  console.log('server bound');
  if(!fs.existsSync(cacheName)) {
    fs.mkdirSync(cacheName);  
  }
});

function ctx(sock) { //'connection' listener
  console.log('client connected');  
  
  sock.on('data', function(d) {
    data += d.toString();    
    sock.write('finish');  //  HACK:怎么看都不对， 但是进不去end是为什么。  
  });
  
  sock.on('end', function() {
    
    // 数据一致化
    var _dataSplit = normalize(data);
    var _main = path.join(cacheName, _dataSplit.shift());
    console.log(_main);
    for(var i = 0; _dataSplit[i] ; i += 2) {
      
      var fileName = path.join(cacheName + _dataSplit[i]);
      var fileData = _dataSplit[i + 1];      
      var _temp = path.dirname(fileName);
      
      // console.log(fileName, ":", !fs.existsSync(_temp));
      
      // 目录存在否
      if (!fs.existsSync(_temp)) { fs.mkdirSync(_temp); }
      
      // 正常写文件
      fs.writeFileSync(path.normalize(fileName), fileData);
    }
    
    // 进程重启
    // if (child) child.kill();
    // fork main 重启进程
    // child = child_process.fork(_main);  
    data = '';
  });
  sock.on('error', function(e) {if(e){console.error(e);}});
}

function normalize(data) {
    // 规则
    var _split = '\n' + data.split('\n')[1] + '\n';
    
    return data.split(_split).splice(1);
}