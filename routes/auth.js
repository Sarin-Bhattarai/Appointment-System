const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserValidation } = require("../validation");
const handleError = require("../helper/handleError");
const { wrapAsync } = require("../helper/catchHandler");

const router = express.Router();

router.post(
  "/login",
  loginUserValidation(),
  handleError,
  wrapAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("user doesn't exist");
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
    res.header("x-auth-token", token).send(token);
  })
);

module.exports = router;
