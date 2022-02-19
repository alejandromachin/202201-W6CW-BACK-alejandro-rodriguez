const Robot = require("../../database/models/Robot");

require("dotenv").config();

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();

  res.json({ robots });
};
const getRobotById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const robot = await Robot.findById(id);
    if (robot) {
      res.json(robot);
    } else {
      const error = new Error("Sorry, robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};
module.exports = { getAllRobots, getRobotById };
