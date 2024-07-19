const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");
const { validateUser } = require("../validators/userValidators");

router.post("/users", validateUser, createUser);
router.get("/users", getUsers);

module.exports = router;
