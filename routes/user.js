const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { registerUserValidation } = require("../validation");
const handleError = require("../helper/handleError");

const router = express.Router();

//for registering the User
router.post(
  "/register",
  registerUserValidation(),
  handleError,
  async (req, res) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      role: req.body.role,
    };
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    try {
      User.find({ email: req.body.email }, async (error, user) => {
        if (error) {
          return res
            .status(400)
            .json({ status: "error", message: error.message });
        }
        if (user.length > 0) {
          return res.status(500).json({
            status: "fail",
            data: { user: "User is already Registered" },
          });
        } else {
          const user = new User(userData);
          const result = await user.save();
          return res
            .status(200)
            .json({ status: "success", data: { user: user } });
        }
      });
    } catch (ex) {
      res.status(400).send({ status: "error", message: ex.message });
    }
  }
);

module.exports = router;