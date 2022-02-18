require("dotenv").config();
const express = require("express");

const robotRouter = express.Router();

router.get("/robots", async (req, res) => {
  const robots = await Robot.find();
  res.json({ robots });
});

module.exports = robotRouter;
