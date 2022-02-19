require("dotenv").config();
const connectToDatabase = require("./database/index");
const runTheServer = require("./server/index");

const port = process.env.PORT || 4000;
const mongoPort = process.env.MONGO_CONECT_PRODUCTION;

(async () => {
  await runTheServer(port);
  await connectToDatabase(mongoPort);
})();
