require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const Robot = require("../../database/models/Robot");
const User = require("../../database/models/User");

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

const getToken = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Sorry, you are not invited to the party");
    error.code = 404;
    next(error);
  } else {
    const userData = {
      username: user.name,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Sorry, you are not who you say you are");
      error.code = 404;
      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);
      res.json({ token });
    }
  }
};
module.exports = { getAllRobots, getRobotById, getToken, postRobot, editRobot };
