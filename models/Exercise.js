const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  user_id: String,
  description: String,
  duration: Number,
  date: Date,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
