require("dotenv").config();
const debug = require("debug")("robots:root");

const runTheServer = require("./server/index");

const port = process.env.SERVER_PORT || 4000;

(async () => {
  await runTheServer(port);
})();
