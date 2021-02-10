const SerialPort = require("serialport");

const DGT_SEND_RESET = Buffer.from("40", "hex");
const DGT_SEND_BRD = Buffer.from("42", "hex");
const DGT_SEND_UPDATE_BRD = Buffer.from("44", "hex");
const DGT_RETURN_SERIALNR = Buffer.from("45", "hex");
const DGT_SEND_VERSION = Buffer.from("4D", "hex");

const boardDataConverter = (boardData) => {
  const fields = boardData.slice(3);
  const _data = [];
  let field;
  for (let i = 0; i < fields.length; i++) {
    _data[i] = fields.readInt8(i);
  }
  return _data;
};

const connectDGTBoard = (port) =>
  new Promise((resolve, reject) => {
    const serialport = new SerialPort(port, {
      baudRate: 9600,
      autoOpen: false,
      // endOnClose: true,
      // lock: false
    });

    let chunks = Buffer.alloc(0);
    const requests = [];

    const sendMessage = async (command, length) =>
      new Promise((resolve) => {
        serialport.write(Buffer.from(command, "hex"));
        requests.push({ length, callback: resolve });
      });

    serialport.on("data", (payload) => {
      if (payload) {
        chunks = Buffer.concat([chunks, payload]);
      }

      let safety = 1000;
      while (
        safety-- &&
        requests.length &&
        requests[0].length <= chunks.length
      ) {
        const request = requests.shift();
        const value = chunks.slice(0, request.length);
        chunks = chunks.slice(request.length);
        request.callback(value);
      }
    });

    const board = {
      close: () => serialport.close(),
      reset: () => serialport.write(Buffer.from(DGT_SEND_RESET, "hex")),
      mode: () => serialport.write(Buffer.from(DGT_SEND_UPDATE_BRD, "hex")),
      getSerialNumber: async () =>
        (await sendMessage(DGT_RETURN_SERIALNR, 8))
          .toString("ascii")
          .replace(/[^0-9]/g, ""),
      getVersion: async () => {
        const data = await sendMessage(DGT_SEND_VERSION, 5);
        return data.readInt8(3) + "." + data.readInt8(4);
      },
      getBoard: async () =>
        boardDataConverter(await sendMessage(DGT_SEND_BRD, 67)),
    };

    let tries = 15;
    const openSerialPort = () => {
      serialport.open((err) => {
        if (tries--) {
          if (err) {
            console.log({ err });
            setTimeout(openSerialPort, 2000);
          } else {
            resolve(board);
          }
        } else {
          reject("ran out of tries connecting to socket");
        }
      });
    };

    openSerialPort();
  });

module.exports = connectDGTBoard;
