import * as zmq from "https://raw.githubusercontent.com/jjeffcaii/deno-zeromq/master/mod.ts";

void (async () => {
  const dec = new TextDecoder("utf8");
  const sock = zmq.Subscribe();
  await sock.connect("tcp://localhost:5555");
  await sock.subscribe("dgt-board:position");

  for await (const [head, msg] of sock) {
    console.log(dec.decode(msg));
  }
})();
