const connectDGTBoard = require("./connect-dgt-board.js");
const zmq = require("zeromq");
const { readdir } = require("fs");

void (async () => {
  const socket = new zmq.Publisher();

  const bindstring = "tcp://*:5555";
  await socket.bind(bindstring);
  console.log(`Listening to ${bindstring}`);

  const files = await new Promise((resolve, reject) =>
    readdir("/dev", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  );

  const boards = files
    .filter((file) => /^tty\.DGT_/.test(file))
    .map((file) => `/dev/${file}`);

  // TODO: I think this will block if there are two boards because of the while loop
  // TODO: use more appropriate for asyc in loop
  boards.forEach(async (board) => {
    const {
      reset,
      getBoard,
      getSerialNumber,
      getVersion,
    } = await connectDGTBoard(board);

    await reset();
    const serialNumber = await getSerialNumber();
    const version = await getVersion();

    console.log(`Connected to board: ${JSON.stringify({ serialNumber, version })}`);

    let position = "";

    // let heartbeat = 0
    while (true) {
      const nextPosition = JSON.stringify(await getBoard());
      if (nextPosition !== position) {
        position = nextPosition;
        const message = JSON.stringify({
          timestamp: new Date().toISOString(),
          serialNumber,
          version,
          position: JSON.parse(position),
        });
        console.log(message);
        await socket.send(["dgt-board:position", message]);
      }

      // if (heartbeat++ === 10) {
      //   heartbeat = 0
      //   const message = {
      //     timestamp: new Date().toISOString(),
      //     serialNumber,
      //     version,
      //     position: JSON.parse(position),
      //   };
      //   await socket.send(["dgt-board:position", JSON.stringify(message)]);
      // }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  });
})();
