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
  readSingleAppointment,
} = require("../controllers/appointment");
const {
  appointmentValidation,
  editAppointmentValidation,
  // validateBeginsAt,
} = require("../validation");

router.get("/appointments", getAppointment);

//Getting single Appointment
router.get("/appointments/:appointmentId", readSingleAppointment);

router.post(
  "/appointments",
  appointmentValidation(),
  // validateBeginsAt(),
  handleError,
  verifyLogin,
  isAdmin,
  createAppointment
);

router.put(
  "/appointments/:appointmentId",
  editAppointmentValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  editAppointment
);

router.delete(
  "/appointments/:appointmentId",
  verifyLogin,
  isAdmin,
  deleteAppointment
);

module.exports = router;
