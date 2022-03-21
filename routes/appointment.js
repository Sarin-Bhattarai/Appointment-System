const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../middlewares/verifyLogin");
const handleError = require("../helper/handleError");
const { isAdmin } = require("../controllers/auth");
const appointmentController = require("../controllers/appointment");
const { wrapAsync } = require("../helper/catchHandler");
const {
  appointmentValidation,
  editAppointmentValidation,
} = require("../validation");

/**
 * @Routes Start here
 */

router.get("/appointments", wrapAsync(appointmentController.getAppointment));

//Getting single Appointment
router.get(
  "/appointments/:appointmentId",
  wrapAsync(appointmentController.readSingleAppointment)
);

router.post(
  "/appointments",
  appointmentValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(appointmentController.createAppointment)
);

router.put(
  "/appointments/:appointmentId",
  editAppointmentValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(appointmentController.editAppointment)
);

router.delete(
  "/appointments/:appointmentId",
  verifyLogin,
  isAdmin,
  wrapAsync(appointmentController.deleteAppointment)
);

module.exports = router;
