require("dotenv").config();
const express = require("express");
const {
  getAllRobots,
  getRobotById,
  getToken,
} = require("../controllers/robotsControler");

const router = express.Router();

router.get("/", getAllRobots);
router.get("/:id", getRobotById);
router.get("/", getToken);

module.exports = router;
