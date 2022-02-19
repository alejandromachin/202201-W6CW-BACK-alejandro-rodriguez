const Robot = require("../../database/models/Robot");

require("dotenv").config();

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();

  res.json({ robots });
};

module.exports = { getAllRobots };
