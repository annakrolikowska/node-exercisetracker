const express = require("express");
const router = express.Router();
const {
  addExercise,
  getUserLogs,
} = require("../controllers/exerciseController");
const {
  validateExercise,
  validateLogs,
} = require("../validators/exerciseValidators");

router.post("/users/:_id/exercises", validateExercise, addExercise);
router.get("/users/:_id/logs", validateLogs, getUserLogs);

module.exports = router;
