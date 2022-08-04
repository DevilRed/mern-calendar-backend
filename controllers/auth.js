const { response } = require("express"); // to get autocomplete intellisense

const createUser = (req, res = response) => {
  // to get autocomplete intellisense
  res.json({
    ok: true,
    msg: "register",
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
