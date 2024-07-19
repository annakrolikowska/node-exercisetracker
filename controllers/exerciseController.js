const { validationResult } = require("express-validator");
const User = require("../models/User");
const Exercise = require("../models/Exercise");

const addExercise = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      const exerciseObj = new Exercise({
        user_id: user._id,
        description,
        duration,
        date: date ? new Date(date) : new Date(),
      });
      const exercise = await exerciseObj.save();
      res.json({
        _id: user._id,
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserLogs = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { from, to, limit } = req.query;
  const id = req.params._id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  let dateObj = {};
  if (from) {
    dateObj["$gte"] = new Date(from);
  }
  if (to) {
    dateObj["$lte"] = new Date(to);
  }

  let filter = {
    user_id: id,
  };
  if (from || to) {
    filter.date = dateObj;
  }
  try {
    const exercises = await Exercise.find(filter).limit(+limit ?? 20);

    const log = exercises.map((e) => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString(),
    }));

    res.json({
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addExercise,
  getUserLogs,
};
