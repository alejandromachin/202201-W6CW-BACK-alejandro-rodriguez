require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("robots:server");
const { notFoundError, generalError } = require("./middlewares/errors");

const getTokenRouter = require("./routes/getTokenRouter");
const robotRouter = require("./routes/robotRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const runTheServer = (port) =>
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

app.use("/login", getTokenRouter);
app.use("/robots", robotRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = runTheServer;
