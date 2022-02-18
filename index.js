require("dotenv").config();

const runTheServer = require("./server");

const port = process.env.SERVER_PORT || 4000;

(async () => {
  await runTheServer(port);
})();
