const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:1984');

// ws.on('open', function open() {
//   ws.send('something');
// });

ws.on('message', function incoming(data) {
  console.log(data);
});
