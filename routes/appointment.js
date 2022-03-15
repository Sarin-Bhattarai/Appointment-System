const express = require("express");
const router = express.Router();

const { verifyLogin } = require("../middlewares/verifyLogin");
const handleError = require("../helper/handleError");
const { isAdmin } = require("../controllers/auth");
const {
  getAppointment,
  createAppointment,
  editAppointment,
  deleteAppointment,
} = require("../controllers/appointment");
const {
  appointmentValidation,
  editAppointmentValidation,
  validateBeginsAt,
} = require("../validation");

router.get("/appointments", getAppointment);

router.post(
  "/appointment/create/:userId",
  appointmentValidation(),
  validateBeginsAt(),
  handleError,
  verifyLogin,
  isAdmin,
  createAppointment
);

router.put(
  "/appointment/:appointmentId",
  editAppointmentValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  editAppointment
);

router.delete(
  "/appointment/:appointmentId",
  verifyLogin,
  isAdmin,
  deleteAppointment
);

module.exports = router;
