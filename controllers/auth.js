const { response } = require("express"); // require express to get autocomplete intellisense
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;
  // to get autocomplete intellisense
  // error handling
  const errors = validationResult(req); // pass in request object
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(), // show errors in response
    });
  }

  res.status(201).json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
};
const login = (req, res = response) => {
  res.json({
    ok: true,
    msg: "login",
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
