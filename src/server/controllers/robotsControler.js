require("dotenv").config();

const Robot = require("../../database/models/Robot");

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();

  res.json(robots);
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

const postRobot = async (req, res) => {
  const newRobot = req.body;

  const createdRobot = await Robot.create(newRobot);

  res.status(201);
  res.json(createdRobot);
};

const editRobot = async (req, res) => {
  const newRobot = req.body;

  const createdRobot = await Robot.findByIdAndUpdate(newRobot.id, newRobot);

  res.status(201);
  res.json(createdRobot);
};

module.exports = { getAllRobots, getRobotById, postRobot, editRobot };
