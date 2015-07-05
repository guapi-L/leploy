var read = require('fs').readFileSync;
var Socket = require('net').Socket;
var client = new Socket();

var data = '';

client.connect(10070, function () {
  client.write(read('../server.js').toString());
});

client.on('data', function(data) {
  data += data.toString();
  console.log(data);
  client.destroy();
})

client.on('close', function() {
  console.log('Connection closed');
});