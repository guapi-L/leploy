var read = require('fs').readFileSync;
var Socket = require('net').Socket;
var client = new Socket();
var fsEc = require('./fs-ergodic.js');
var join = require('path').join;
var luan = require('./luan.js');

var data = '';
var _split = '\n----------------------' + luan(16) + '-----------------------\n';

client.connect(10070, function () {
  var buildDir = join(__dirname, '../build');
  fsEc(buildDir, function(file) {
    client.write(_split + file.split(buildDir)[1]);
    client.write(_split + read(file));
  });
});

client.on('data', function(data) {
  data += data.toString();
  console.log(data);
  client.destroy();
})

client.on('close', function() {
  console.log('Connection closed');
});
