const { readdir } = require("fs");
const loadBoard = require("./load-board");

const connectBoards = async () => {
  const boards = [];

  const files = await new Promise((resolve, reject) =>
    readdir("/dev", (err, files) => {
      if (err) {
        reject(err);
      } else resolve(files);
    })
  );

  const sockets = files
    .filter((file) => /^tty\.DGT_/.test(file))
    .map((file) => `/dev/${file}`);

  for (const socket of sockets) {
    if (!boards.filter((board) => board.socket === socket).length) {
      const board = { socket, subscribers: [] };
      boards.push(board);

      const { serialNumber, version, initialPosition, close } = await loadBoard(
        socket,
        (data) => {
          // console.log(data)
          board.lastKnownPosition = JSON.parse(data).position
          board.subscribers.forEach((subscriber) => {
            subscriber(data);
          });
        }
      );

      board.serialNumber = serialNumber;
      board.version = version;
      board.initialPosition = initialPosition;
      board.lastKnownPosition = initialPosition
      board.close = close;
    } else {
      console.log(`already registered ${socket}`);
    }
  }

  // TODO: Figure out how to deregister on disconnect, then poll for new board connections
  // setTimeout(connectBoards, 2000)
  console.log(boards)
  return boards;
};

module.exports = connectBoards;
