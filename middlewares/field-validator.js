const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldValidator = (req, res = response, next) => {
  // error handling
  const errors = validationResult(req); // pass in request object
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(), // show errors in response
    });
  }

  next();
};

module.exports = {
  fieldValidator,
};
