const moment = require("moment");

// custom valition for express-validator
const isDate = (value, { req, location, path }) => {
  // console.log(value, req, location, path);// data comes from express-validator
  if (!value) {
    return false;
  }
  const date = moment(value);
  if (date.isValid()) {
    return true;
  }
  return false;
};
module.exports = { isDate };
