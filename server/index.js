require("dotenv").config();
const express = require("express");
const debug = require("debug")("robots:server");

const app = express();

const runTheServer = (port) => {
  new Promise((resolve, reject) => {
    const server = app.listen((port) => {
      debug(`We are running on port http://localhost:${port}`);
      resolve();
    });
    server.on(error, (error) => {
      const message =
        error.code === "EADDRINUSE" ? `Port ${port} busy` : error.message;
      reject(new Error(`Error on server: ${message}`));
    });
  });
};

module.exports = { runTheServer };
