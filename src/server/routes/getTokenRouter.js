require("dotenv").config();
const express = require("express");
const { getToken } = require("../controllers/robotsControler");

const router = express.Router();

router.get("/", getToken);

module.exports = getToken;
