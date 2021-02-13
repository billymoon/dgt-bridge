const logger = require('../dgt-logger');

const WebSocket = require('ws');

void (async () => {
  const { info, subscribe } = await logger();
  const wss = new WebSocket.Server({ port: 1984 });

  wss.on('connection', function connection(ws) {
    subscribe(data => {
      const jsonData = JSON.stringify(data)
      console.log(jsonData)
      ws.send(jsonData)
    });
    // ws.on('message', function incoming(message) {
    //   console.log('received: %s', message);
    // });

    ws.send(JSON.stringify(info()));
  });
})();

