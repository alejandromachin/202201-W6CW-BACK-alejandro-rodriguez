require("dotenv").config();
const cors = require("cors");

const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("robots:server");
const robotRouter = require("./routes/robotRouter");

const app = express();
app.use(express.static(`${__dirname}/`));
app.use(morgan("dev"));

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
app.use(cors());
app.use("/myrobots", robotRouter);
app.get("/robots", (req, res) => {
  res.json({ hola: "probando" });
});

module.exports = runTheServer;
