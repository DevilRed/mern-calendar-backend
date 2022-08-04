const { response } = require("express"); // to get autocomplete intellisense

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;
  // to get autocomplete intellisense
  // add validation example
  if (name.length < 5) {
    return res.status(400).json({
      ok: false,
      msg: "name must be greather than 5 letters",
    });
  }
  res.status(200).json({
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
