const { check, query } = require("express-validator");

const validateExercise = [
  check(":_id").notEmpty().withMessage("Id is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("duration").isNumeric().withMessage("Duration must be a number"),
  check("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format"),
];

const validateLogs = [
  query("from")
    .optional()
    .isISO8601()
    .withMessage("From date must be in YYYY-MM-DD format"),
  query("to")
    .optional()
    .isISO8601()
    .withMessage("To date must be in YYYY-MM-DD format"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive number"),
];

module.exports = {
  validateExercise,
  validateLogs,
};
