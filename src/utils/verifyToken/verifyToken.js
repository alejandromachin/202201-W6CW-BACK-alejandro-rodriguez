const verifyToken = async (req, res, next) => {
  const { token } = req.params;

  if (typeof token !== "undefined") {
    await jwt.verify(token, secret, (error) => {
      if (error) {
        const newError = new Error("You are not authorized");
        newError.type = errorTypes.invalidToken;
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
