/**
 * auth routes
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { body } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const { createUser, login, renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  /* [
    // custom middleware go as a second param in routes
    // add express-validator
    check("name").not().isEmpty().withMessage("name is required"),
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("password must be greather than 6 characters"),
    fieldValidator,
  ], */
  // other way to define rules
  body("name").not().isEmpty(),
  body("email").isEmail(),
  body("password").isLength({
    min: 6,
  }),
  fieldValidator,
  createUser
);

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  login
);

// add middleware to revalidate token, if more middlewares are needed use an array otherwise declare only the needed middleware
router.get("/renew", validateJWT, renewToken);

module.exports = router; // node export system
