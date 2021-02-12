const SerialPort = require("serialport");
const dgtMethods = require("./dgt-methods");

const boardConnector = (port) =>
  new Promise((resolve, reject) => {
    const serialport = new SerialPort(port, {
      baudRate: 9600,
      autoOpen: false,
      // endOnClose: true,
      // lock: false
    });

    let chunks = Buffer.alloc(0);
    const requests = [];

    serialport.on("data", (payload) => {
      if (payload) {
        chunks = Buffer.concat([chunks, payload]);
      }

      while (
        requests.length &&
        requests[0].returnDataLength <= chunks.length
      ) {
        const request = requests.shift();
        const value = chunks.slice(0, request.returnDataLength);
        chunks = chunks.slice(request.returnDataLength);
        request.callback(value);
      }
    });

    const dgtMethodReducer = (
      memo,
      { methodName, messageTypeCode, returnDataLength, returnDataHandler }
    ) => {
      const method = returnDataLength
        ? async () =>
            new Promise((resolve) => {
              serialport.write(Buffer.from(messageTypeCode, "hex"));
              requests.push({
                returnDataLength,
                callback: (data) => resolve(returnDataHandler(data)),
              });
            })
        : () => serialport.write(Buffer.from(messageTypeCode, "hex"));

      return {
        [methodName]: method,
        ...memo,
      };
    };

    const board = {
      close: () => serialport.close(),
      ...dgtMethods.reduce(dgtMethodReducer, {})
    };

    let tries = 15;
    const openSerialPort = () => {
      serialport.open((err) => {
        if (tries--) {
          if (err) {
            // console.log({ err });
            process.stdout.write('.')
            setTimeout(openSerialPort, 2000);
          } else {
            resolve(board);
          }
        } else {
          reject("ran out of tries connecting to socket");
        }
      });
    };

    process.stdout.write('Connecting to board')
    openSerialPort();
  });

module.exports = boardConnector;
