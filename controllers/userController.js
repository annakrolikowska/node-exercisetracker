const { validationResult } = require("express-validator");
const User = require("../models/User");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const userObj = new User({ username: req.body.username });

  try {
    const user = await userObj.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("_id username");
    if (!users) {
      res.status(404).send("Users not found");
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
