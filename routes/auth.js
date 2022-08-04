/**
 * auth routes
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, renewToken } = require("../controllers/auth");
const router = Router();

router.post(
  "/new",
  [
    // custom middleware go as a second param in routes
    // add express-validator
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password must be greather than 6 characters").isLength({
      min: 6,
    }),
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({
      min: 6,
    }),
  ],
  login
);

router.get("/renew", renewToken);

module.exports = router; // node export system
