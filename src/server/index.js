require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
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

app.use("/login", getTokenRouter);
app.use("/robots", robotRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
