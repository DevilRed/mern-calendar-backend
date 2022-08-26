const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  // token is going to be in header with a key: x-token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There is no token in the request",
    });
  }
  try {
    // verify token sign
    // if SECRET_JWT_SEED changes then all token are going to be invalidated, so users can be forced to authenticate again
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // add uid, name in the request so that they are gonna be available in next middleware
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token not valid",
    });
  }
  // if token valid go to next() request
  next();
};

module.exports = {
  validateJWT,
};
