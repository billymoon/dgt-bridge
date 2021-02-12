const boardConnector = require("./board-connector");

const loadBoard = async (port, callback) => {
  const { reset, getBoard, getSerialNumber, getVersion, close } = await boardConnector(
    port
  );

  await reset();
  const serialNumber = await getSerialNumber();
  const version = await getVersion();
  const initialPosition = await getBoard()

  console.log(
    `Connected to board: ${JSON.stringify({ serialNumber, version })}`
  );

  let position = "";

  const checkForNewPosition = async () => {
    const nextPosition = JSON.stringify(await getBoard());
    if (nextPosition !== position) {
      position = nextPosition;
      callback(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          serialNumber,
          version,
          position: JSON.parse(position),
        })
      );
    }
    setTimeout(checkForNewPosition, 200);
  };

  checkForNewPosition();

  return {
    serialNumber,
    version,
    initialPosition,
    close
  };
};

module.exports = loadBoard;
