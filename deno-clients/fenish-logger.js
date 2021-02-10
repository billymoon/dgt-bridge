import * as zmq from "https://raw.githubusercontent.com/jjeffcaii/deno-zeromq/master/mod.ts";

const pieces = [
  ".",
  "P",
  "R",
  "N",
  "B",
  "K",
  "Q",
  "p",
  "r",
  "n",
  "b",
  "k",
  "q",
];

const fenish = (position) =>
  position
    .map((i) => pieces[i])
    .join("")
    .split(/(........)/g)
    .filter((i) => !!i)
    .join("/")
    .replace(/\.+/g, (all) => all.length);

void (async () => {
  const dec = new TextDecoder("utf8");
  const sock = zmq.Subscribe();
  await sock.connect("tcp://localhost:5555");
  await sock.subscribe("dgt-board:position");

  for await (const [head, msg] of sock) {
    const message = JSON.parse(dec.decode(msg));
    console.log(fenish(message.position));
  }
})();
