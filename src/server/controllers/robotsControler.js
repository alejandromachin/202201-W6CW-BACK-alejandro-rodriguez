const Robot = require("../../database/models/Robot");

require("dotenv").config();

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();

  res.json({ robots });
};
const getRobotById = async (req, res) => {
  const { id } = req.params;
  const robots = await Robot.findById(id);
  res.json({ robots });
};

module.exports = { getAllRobots, getRobotById };
