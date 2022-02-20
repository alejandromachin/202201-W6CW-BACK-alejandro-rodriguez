require("dotenv").config();
const express = require("express");
const {
  getAllRobots,
  getRobotById,
} = require("../controllers/robotsControler");

const router = express.Router();

router.get("/", getAllRobots);
router.get("/:id", getRobotById);

module.exports = router;
