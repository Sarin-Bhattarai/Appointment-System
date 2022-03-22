const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../middlewares/verifyLogin");
const handleError = require("../helper/handleError");
const appointmentController = require("../controllers/appointment");
const { wrapAsync } = require("../helper/catchHandler");
const {
  appointmentValidation,
  editAppointmentValidation,
} = require("../validation");

/**
 * @Appointment routes Start here
 */

router.get("/", wrapAsync(appointmentController.getAppointment));

//Getting single Appointment
router.get(
  "/:appointmentId",
  wrapAsync(appointmentController.readSingleAppointment)
);

router.post(
  "/",
  appointmentValidation(),
  handleError,
  verifyLogin,
  wrapAsync(appointmentController.createAppointment)
);

router.put(
  "/:appointmentId",
  editAppointmentValidation(),
  handleError,
  verifyLogin,
  wrapAsync(appointmentController.editAppointment)
);

router.delete(
  "/:appointmentId",
  verifyLogin,
  wrapAsync(appointmentController.deleteAppointment)
);

module.exports = router;
