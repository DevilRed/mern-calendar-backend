const { response } = require("express"); // require express to get autocomplete intellisense
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

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

    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact with site administrator",
    });
  }
};
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "user not found",
      });
    }
    // match passwords
    const validPassword = bcrypt.compareSync(password, user.password); // compare with db
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password not valid",
      });
    }
    // generate JWT
    const token = await generateJWT(user.id, user.name);
    // send JWT
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact with site administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  // if a valid token then regenerate it to update the user session
  const { uid, name } = req;
  // regenerate JWT
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
