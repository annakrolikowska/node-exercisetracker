const { check } = require("express-validator");

const validateUser = [
  check("username").notEmpty().withMessage("Username is required"),
];

module.exports = {
  validateUser,
};
