const { response } = require("express"); // require express to get autocomplete intellisense
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  // add response to get autocomplete intellisense
  try {
    // verify email existing
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "The provided email is already in use",
      });
    }
    // add new user object
    user = new User(req.body);

    // hash user password
    const salt = bcrypt.genSaltSync(); // generate a random code to be used in encryption
    user.password = bcrypt.hashSync(password, salt); // apply encryption to password
    // save user
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
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
