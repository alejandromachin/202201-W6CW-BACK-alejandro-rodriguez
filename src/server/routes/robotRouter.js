require("dotenv").config();
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const {
  getAllRobots,
  getRobotById,
  postRobot,
} = require("../controllers/robotsControler");

const router = express.Router();

router.get("/", getAllRobots);
router.get("/:id", getRobotById);
router.post("/create", verifyToken, postRobot);
router.post("/update", verifyToken, postRobot);

module.exports = router;
