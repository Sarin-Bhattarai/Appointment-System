const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserValidation } = require("../validation");
const handleError = require("../helper/handleError");
const { wrapAsync } = require("../helper/catchHandler");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *    tags:
 *      - Auth
 *    summary: login user
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: body
 *      name: email
 *      description: users's email
 *      required: true
 *      type: string
 *      format: email
 *    - in: body
 *      name: password
 *      description: users's password
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: receieve token
 *        400:
 *          description: invalid password
 *        404:
 *          description: user doesn't exist
 */
router.post(
  "/login",
  loginUserValidation(),
  handleError,
  wrapAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user doesn't exist");
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
