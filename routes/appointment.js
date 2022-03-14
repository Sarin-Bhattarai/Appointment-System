const express = require("express");
const router = express.Router();

const { verifyLogin } = require("../middlewares/verifyLogin");
const handleError = require("../helper/handleError");
const { isAdmin } = require("../controllers/auth");
const {
  getAppointment,
  createAppointment,
} = require("../controllers/appointment");
const { appointmentValidation } = require("../validation");

router.get("/appointments", getAppointment);

router.post(
  "/appointment/create/:userId",
  appointmentValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  createAppointment
);

module.exports = router;
