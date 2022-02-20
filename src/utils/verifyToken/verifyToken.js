const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.autorization;
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split[" "][1];
    req.token = bearerToken;
    next();
  } else {
    const error = new Error("Sorry, you are not authorized to do this");
    error.code = 403;
    next(error);
  }
};

export default verifyToken;
