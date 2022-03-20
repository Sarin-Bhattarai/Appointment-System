const express = require("express");
const User = require("../models/user");
const Appointment = require("../models/appointment");
const { registerUserValidation } = require("../validation");
const handleError = require("../helper/handleError");
const userController = require("../controllers/user");
const { verifyLogin } = require("../middlewares/verifyLogin");
const { wrapAsync } = require("../helper/catchHandler");

const router = express.Router();

//for registering the User
router.post(
  "/register",
  registerUserValidation(),
  handleError,
  wrapAsync(userController.registerUser)
);

//user profile get and update
router.get("/users", verifyLogin, wrapAsync(userController.profile));

router.put("/users", verifyLogin, wrapAsync(userController.updateProfile));

/**
 * @Doctor Routes
 */

//get doctor based on categories
router.get("/users/:categoryId", verifyLogin, async (req, res) => {
  try {
    const user = await User.find({ category: req.params.categoryId });
    return res.status(200).json({
      status: "success",
      data: { user: user },
    });
  } catch (ex) {
    return res
      .status(400)
      .json({ status: "error", message: "cannot get user" });
  }
});

//get appointments according to doctor
router.get("/appointments/:userId", verifyLogin, async (req, res) => {
  try {
    const appointment = await Appointment.find({ user: req.params.userId });
    return res.status(200).json({
      status: "success",
      data: { appointment: appointment },
    });
  } catch {
    return res
      .status(400)
      .json({ status: "error", message: "cannot get appointments" });
  }
});

//editing appointments from doctor
router.put(
  "/appointments/:appointmentId/:userId",
  verifyLogin,
  async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.appointmentId);

      if (req.body.status) {
        appointment.status = req.body.status;
      }
      const result = await appointment.save();
      return res
        .status(200)
        .json({ status: "success", data: { appointment: result } });
    } catch {
      return res
        .status(400)
        .json({ status: "error", message: "something went wrong" });
    }
  }
);

module.exports = router;
