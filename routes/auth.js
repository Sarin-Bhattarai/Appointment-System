const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserValidation } = require("../validation");
const handleError = require("../helper/handleError");

const router = express.Router();

router.post("/login", loginUserValidation(), handleError, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("User doesn't exist");
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
    res.header("x-auth-token", token).send(token);
  } catch (error) {
    return res.status(400).json({ status: "Error", message: error.message });
  }
});

module.exports = router;
