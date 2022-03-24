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
 * @swagger
 * tags:
 *   name: Appointment
 *   description: The appointment managing API
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *    tags:
 *      - Appointment
 *    summary: fetch all appointments
 *    produces:
 *    -application/json
 *    responses:
 *        200:
 *          description: success
 */

router.get("/", wrapAsync(appointmentController.getAppointment));

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   get:
 *    tags:
 *      - Appointment
 *    summary: fetch single appointment
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: appointmentId
 *      descritption: appointmentId
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: success
 */
router.get(
  "/:appointmentId",
  wrapAsync(appointmentController.readSingleAppointment)
);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *    tags:
 *      - Appointment
 *    summary: create appointment
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: body
 *      name: title
 *      description: appointment title
 *      required: true
 *      type: string
 *    - in: body
 *      name: beginsAt
 *      description: appointment beginsAt(time)
 *      required: true
 *      type: string
 *      format: date-time
 *    - in: body
 *      name: date
 *      description: appointment date
 *      required: true
 *      type: string
 *      format: date
 *    - in: body
 *      name: endsAt
 *      description: appointment endsAt(time)
 *      required: true
 *      type: string
 *      format: date-time
 *    - in: body
 *      name: appointmentWith
 *      description: user who are appointed with(doctor)
 *      required: true
 *      type: string
 *    - in: body
 *      name: status
 *      description: status of appointment
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: success
 */

router.post(
  "/",
  appointmentValidation(),
  handleError,
  verifyLogin,
  wrapAsync(appointmentController.createAppointment)
);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   put:
 *    tags:
 *      - Appointment
 *    summary: update appointment
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: appointmentId
 *      description: appointmentId
 *      required: true
 *      type: string
 *    - in: body
 *      name: title
 *      description: appointment title
 *      required: true
 *      type: string
 *    - in: body
 *      name: status
 *      description: appointment status
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: updates category
 */

router.put(
  "/:appointmentId",
  editAppointmentValidation(),
  handleError,
  verifyLogin,
  wrapAsync(appointmentController.editAppointment)
);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   delete:
 *    tags:
 *      - Appointment
 *    summary: delete appointment
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: appointmentId
 *      description: appointmentId
 *      required: true
 *    responses:
 *        200:
 *          description: success
 */

router.delete(
  "/:appointmentId",
  verifyLogin,
  wrapAsync(appointmentController.deleteAppointment)
);

module.exports = router;
