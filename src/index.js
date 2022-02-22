require("dotenv").config();
const connectToDatabase = require("./database/index");
const app = require("./server/index");
const runTheServer = require("./server/runTheServer");

const port = process.env.PORT || 4000;
const mongoPort = process.env.MONGO_CONECT_PRODUCTION;

(async () => {
  await runTheServer(port, app);
  await connectToDatabase(mongoPort);
})();
