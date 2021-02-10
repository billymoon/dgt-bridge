import groq from "https://dev.jspm.io/groq-js";

import {
  Application,
  Router,
  HttpError,
  send,
  Status,
} from "https://deno.land/x/oak@v6.0.1/mod.ts";

import {
  createWebSocket,
  isWebSocketCloseEvent,
  acceptWebSocket,
  acceptable,
} from "https://deno.land/std@0.61.0/ws/mod.ts";

import * as zmq from "https://raw.githubusercontent.com/jjeffcaii/deno-zeromq/master/mod.ts";

void (async () => {
  const CWD = Deno.cwd();

  const port = 1231;
  const connections = new Set();
  const app = new Application({ state: { connections } });
  const router = new Router();

  const logfile = "./event.log.ndjson";
  const log = async (data) => {
    if (data) {
      await Deno.writeTextFile(logfile, JSON.stringify(data) + "\n", {
        append: true,
      });
      everything.push(JSON.stringify(data))
    } else {
      return await Deno.readTextFile(logfile);
    }
  };

  const everything = (await log())
    .split("\n")
    .filter((line) => !!line)
    .map(JSON.parse);

  const positions = everything.filter((row) => !!row.position);
  let lastKnownBoardPosition = JSON.stringify(positions[positions.length - 1]);
  console.log(lastKnownBoardPosition);

  function broadcastEach(connection) {
    connection.send(this);
  }

  function broadcast(msg) {
    console.log(msg);
    connections.forEach(broadcastEach, msg);
  }

  router.get("/everything", async (ctx, next) => {
    // console.log(ctx)
    // console.log(ctx.res)
    // console.log(ctx.res?.send)
    ctx.response.body = JSON.stringify(everything)
  })

  router.get("/socket", async (ctx, next) => {
    if (!ctx.isUpgradable) {
      throw new Error("problem opening socket :(");
    }

    const socket = await ctx.upgrade();

    connections.add(socket);

    broadcast(
      JSON.stringify({
        event: "connect",
        id: socket.conn.rid,
      })
    );

    socket.send(lastKnownBoardPosition);

    for await (const ev of socket) {
      if (isWebSocketCloseEvent(ev)) {
        connections.delete(socket);
        broadcast(
          JSON.stringify({
            event: "close",
            id: socket.conn.rid,
          })
        );
      } else {
        broadcast(JSON.stringify(ev));
      }
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.use(async (ctx) => {
    try {
      await send(ctx, ctx.request.url.pathname, {
        root: `${CWD}/www`,
        index: "index.html",
      });
    } catch (err) {
      if (!/^No such file/.test(err.message)) {
        throw Error(err);
      }
    }
  });

  log({ serverStarted: new Date().toISOString() });

  // app.addEventListener("error", (ev) => {
  //   console.error(ev);
  //   debugger;
  // });

  app.addEventListener("listen", (server) => {
    console.log(
      `open ${server.secure ? "https" : "http"}://${server.hostname}:${
        server.port
      }`
    );
  });

  const whenClosed = app.listen(`:${port}`);
  // await whenClosed;
  // console.log(`closed http :${port}, bye`);

  const dec = new TextDecoder("utf8");

  const sock = zmq.Subscribe();
  await sock.connect("tcp://localhost:5555");
  await sock.subscribe("dgt-board:position");

  for await (const [head, msg] of sock) {
    lastKnownBoardPosition = dec.decode(msg);
    log(JSON.parse(lastKnownBoardPosition));
    broadcast(lastKnownBoardPosition);
  }
})();
