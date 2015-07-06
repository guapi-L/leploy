/**
 * client.js
 * 
 * 客户端一键部署发送
 * { // 几个配置点
 *   PORT : 端口
 *   HOST : 地址
 *   _build : '项目目录'
 *   _main : '入口文件‘
 * }
 */

var read   = require('fs').readFileSync;
var Socket = require('net').Socket;
var client = new Socket();
var fsEc   = require('./lib/fs-ergodic.js');
var join   = require('path').join;
var luan   = require('./lib/luan.js');

var PORT   = 10070;
var HOST   = '127.0.0.1';
var _build = '../build';
var _main  = 'server.js';

var data   = '';
var _split = '\n----------------------' + luan(16) + '-----------------------\n';

client.connect(PORT, HOST, function () {
  // main 指示
  client.write(_split + _main);
  
  // 上传文件
  var buildDir = join(__dirname, _build);
  fsEc(buildDir, function(file) {
    client.write(_split + file.split(buildDir)[1]);
    client.write(_split + read(file));
  });  
});

client.on('data', function(data) {
  // HACK: 之后和服务端断开连接要重写
  data += data.toString();
  console.log(data);
  client.destroy();
})

client.on('close', function() {
  console.log('Connection closed');
});
