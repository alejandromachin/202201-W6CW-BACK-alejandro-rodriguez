require("dotenv").config();
const express = require("express");
const { getAllRobots } = require("../controllers/robotsControler");

const router = express.Router();

router.get("/robots", getAllRobots);

module.exports = router;
