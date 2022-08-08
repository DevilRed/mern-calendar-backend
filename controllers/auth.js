const { response } = require("express"); // require express to get autocomplete intellisense
const User = require("../models/User");

const createUser = async (req, res = response) => {
  // const { name, email, password } = req.body;
  // add response to get autocomplete intellisense
  try {
    // add new user object
    const user = new User(req.body);
    // save user
    await user.save();

    res.status(201).json({
      ok: true,
      msg: "register",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact with site administrator",
    });
  }
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
