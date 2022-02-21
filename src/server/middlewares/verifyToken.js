require("dotenv").config();

const jsonwebtoken = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.query.Authorization;

  const tokenId = token.split(" ")[1];

  if (typeof tokenId !== "undefined") {
    await jsonwebtoken.verify(tokenId, process.env.SECRET, (error) => {
      if (error) {
        const newError = new Error("You are not authorized");
        next(newError);
        return;
      }

      next();
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
