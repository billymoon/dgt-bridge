const express = require("express");
const { Chess } = require("chess.js");
const http = require("http");
const WebSocket = require("ws");
const connectBoards = require("./connect-boards");
const { fenish } = require("./chess-utils");

const app = express();

app.use(express.static("www"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

// let closeSocket

// let currentPosition = ""
// let subscribers = [data => currentPosition = data.position ? fenish(data.position) : ""];

// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

// let subscribers = [];

void (async () => {
  const boards = await connectBoards();

  if (!boards.length) {
    console.log(`just couldn't connect to a board, giving up`);
    process.exit(1);
  }

  console.log(boards);
  const myBoard = boards[0];
  myBoard.chess = new Chess();
  myBoard.gameStarted = false;

  myBoard.getValidNextPositions = () =>
    myBoard.chess.moves().map((move) => {
      const clone = new Chess(myBoard.chess.fen());
      clone.move(move);
      return clone.fen().replace(/ .*/, "");
    });

  myBoard.validNextPosition = (position) => {
    const nextPositions = myBoard.chess.moves().map((move) => {
      const clone = new Chess(myBoard.chess.fen());
      clone.move(move);
      return clone.fen().replace(/ .*/, "");
    });

    return nextPositions.indexOf(position) !== -1;
  };

  // const initialFenish = fenish(myBoard.initialPosition)
  // myBoard.chess.load(initialFenish)
  // console.log(myBoard.chess.ascii(), initialFenish)

  // myBoard.chess.reset();

  server.on("upgrade", function (req, socket, head) {
    wss.handleUpgrade(req, socket, head, function (ws) {
      wss.emit("connection", ws, req);
    });
  });

  // console.log(1.1, myBoard.chess)
  // console.log(1.2, myBoard.chess.moves())
  // console.log(1.3, myBoard.chess.pgn())
  // console.log(2, myBoard.getValidNextPositions())

  // const getValidNextPositions = (chess) =>
  //   chess.moves().map((move) => {
  //     const clone = new Chess(chess.fen());
  //     clone.move(move);
  //     return clone.fen().replace(/ .*/, "");
  //   });

  wss.on("connection", (ws, req) => {
    const jsonMessage = (data) => ws.send(JSON.stringify(data));
    ws.on("message", (rawMessage) => {
      const message = JSON.parse(rawMessage);
      console.log(message);
      if (message.call === "eboards") {
        const reply = {
          response: "call",
          id: message.id,
          param: boards.map(({ serialNumber }) => ({
            serialnr: serialNumber,
            state: "ACTIVE",
          })),
          time: new Date() * 1,
        };
        jsonMessage(reply);
        // console.log({ reply });
      } else if (
        message.call === "subscribe" &&
        message.param.feed === "eboardevent" &&
        message.param.param.serialnr === myBoard.serialNumber
      ) {
        ws.send(
          JSON.stringify({
            response: "call",
            id: message.id,
            param: null,
            time: new Date() * 1,
          })
        );
        ws.send(
          JSON.stringify({
            response: "feed",
            id: 1,
            param: {
              serialnr: message.param.param.serialnr,
              board: myBoard.lastKnownPosition && fenish(myBoard.lastKnownPosition),
            },
            time: new Date() * 1,
          })
        );

        myBoard.subscribers.push((rawData) => {
          const data = JSON.parse(rawData);
          console.log(data);
          const nextPosition = fenish(data.position);
          // const validNextPositions = myBoard.getValidNextPositions();
          // // console.log(validNextPositions);
          if (myBoard.gameStarted && myBoard.validNextPosition(nextPosition)) {
            const moveindex = myBoard
              .getValidNextPositions()
              .indexOf(nextPosition);
            console.log("legitimate move", nextPosition);
            const move = myBoard.chess.moves()[moveindex];
            myBoard.chess.move(move);
            console.log(myBoard.chess.ascii());
            const san = myBoard.chess.history();
            const moveMessage = {
              response: "feed",
              id: 1,
              param: {
                serialnr: message.param.param.serialnr,
                // flipped: false,
                board: nextPosition,
                // start:
                //   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                san,
              },
              time: new Date() * 1,
            };
            console.log({ san, moveMessage });
            jsonMessage(moveMessage);
            //   console.log('got passed the send part');
          } else {
            jsonMessage({
              response: "feed",
              id: message.param.feed.id,
              param: {
                serialnr: message.param.param.serialnr,
                // flipped: false,
                board: nextPosition,
              },
              time: new Date(data.timestamp) * 1,
            });
          }
        });
      } else if (message.call === "call" && message.param.method === "setup") {
        myBoard.gameStarted = true;
        jsonMessage({
          response: "call",
          id: message.id,
          param: null,
          time: new Date() * 1,
        });
        myBoard.chess.load(message.param.param.fen);
        myBoard.lastKnownPosition = myBoard.chess.fen().replace(/ .*/, "");
        jsonMessage({
          response: "feed",
          id: 1,
          param: {
            serialnr: message.param.param.serialnr,
            // flipped: false,
            board: myBoard.lastKnownPosition,
            start: message.param.param.fen,
            san: myBoard.chess.history(),
          },
          time: new Date() * 1,
        });
        // console.log(chess.moves());
      }
      console.log({ message, boards });
    });

    // // ws.on("close", function () {
    // // });
  });

  server.listen(1982, function () {
    console.log("Listening on http://localhost:1982");
  });

  process.on("SIGINT", () => {
    console.log(
      `Closing boards: ${JSON.stringify(boards.map(({ socket }) => socket))}`
    );
    boards.forEach(({ close }) => close && close());
    server.close(() => {
      console.log("Http server closed.");
      process.exit();
    });
  });
})();
