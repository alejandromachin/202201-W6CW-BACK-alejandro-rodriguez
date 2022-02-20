require("dotenv").config();
const express = require("express");
const verifyToken = require("../../utils/verifyToken/verifyToken");
const {
  getAllRobots,
  getRobotById,
  postRobot,
} = require("../controllers/robotsControler");

const router = express.Router();

router.get("/", getAllRobots);
router.get("/:id", getRobotById);
router.post("/create/", verifyToken, postRobot);

module.exports = router;
