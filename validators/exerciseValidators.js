const { check, query } = require("express-validator");

const validateExercise = [
  check(":_id")
    .notEmpty()
    .isLength({ min: 24, max: 24 })
    .withMessage("The ID must contain 24 characters."),
  check("description").notEmpty().withMessage("Description is required"),
  check("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive number"),
  check("date")
    .optional({ checkFalsy: true })
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
