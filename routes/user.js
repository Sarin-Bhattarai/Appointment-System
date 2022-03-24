const express = require("express");
const { registerUserValidation } = require("../validation");
const handleError = require("../helper/handleError");
const userController = require("../controllers/user");
const { verifyLogin } = require("../middlewares/verifyLogin");
const { wrapAsync } = require("../helper/catchHandler");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *    tags:
 *      - User
 *    summary: register user
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: body
 *      name: name
 *      description: users's name
 *      required: true
 *      type: string
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
 *    - in: body
 *      name: phone
 *      description: users's phone
 *      required: true
 *      type: number
 *    - in: body
 *      name: designation
 *      description: users's designation
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: success
 *        400:
 *          description: email already in use
 */

router.post(
  "/register",
  registerUserValidation(),
  handleError,
  wrapAsync(userController.registerUser)
);

/**
 * @swagger
 * /api/users:
 *   get:
 *    tags:
 *      - User
 *    summary: fetchs user profile
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    responses:
 *        200:
 *          description: Fetchs users matching profile
 */
router.get("/", verifyLogin, wrapAsync(userController.profile));

/**
 * @swagger
 * /api/users:
 *   put:
 *    tags:
 *      - User
 *    summary: updates user profile
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: body
 *      name: name
 *      description: users's name
 *      required: true
 *      type: string
 *    - in: body
 *      name: phone
 *      description: users's phone
 *      required: true
 *      type: number
 *    - in: body
 *      name: designation
 *      description: users's designation
 *      required: true
 *      type: string
 *    - in: body
 *      name: category
 *      description: users's category
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: updates user profile
 *        400:
 *          description: something went wrong, please try again!
 */

router.put("/", verifyLogin, wrapAsync(userController.updateProfile));

/**
 * @swagger
 * /api/users/my/appointments:
 *   get:
 *    tags:
 *      - User
 *    summary: get user's appointment
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    responses:
 *        200:
 *          description: success
 *        401:
 *          description: not authenticated
 */
router.get(
  "/my/appointments",
  verifyLogin,
  wrapAsync(userController.getAppointmentOfUser)
);

/**
 * @Doctor Routes
 */

/**
 * @swagger
 * /api/users/{categoryId}:
 *   get:
 *    tags:
 *      - User
 *    summary: fetch doctors based on their category
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: categoryId
 *      descritption: categoryId
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: success
 */

router.get(
  "/:categoryId",
  verifyLogin,
  wrapAsync(userController.doctorBasedOnCategory)
);

/**
 * @swagger
 * /api/users/appointments/{userId}:
 *   get:
 *    tags:
 *      - User
 *    summary: fetch doctors based on their category
 *    security:
 *      -  BearerAuth: [Login]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: categoryId
 *      descritption: categoryId
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: Fetch appointments matching with doctor
 */

router.get(
  "/appointments/:userId",
  verifyLogin,
  wrapAsync(userController.appointmentsAccToDoctor)
);

module.exports = router;
