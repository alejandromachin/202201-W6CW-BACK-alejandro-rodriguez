require("dotenv").config();
const express = require("express");
const robotRouter = require("./routes/robotRouter");
const debug = require("debug")("robots:server");

const app = express();

app.use(morgan("dev"));

const runTheServer = (port) => {
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`We are running on port http://localhost:${port}`);
      resolve();
    });
    server.on("error", (error) => {
      const message =
        error.code === "EADDRINUSE" ? `Port ${port} busy` : error.message;
      reject(new Error(`Error on server: ${message}`));
    });
  });
};

app.use("/myrobots", robotRouter);

module.exports = runTheServer;
