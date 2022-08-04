const { response } = require("express"); // require express to get autocomplete intellisense

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;
  // add response to get autocomplete intellisense

  res.status(201).json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
};
const login = (req, res = response) => {
  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: "login",
    email,
    password,
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
