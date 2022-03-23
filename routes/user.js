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
 *  post:
 *    summary: Register the user
 *    tags: [User]
 *    parameters:
 *       - in: body
 *         name: name
 *         schema:
 *         - type: string
 *         required: true
 *         description: User's name
 *       - in: body
 *         name: email
 *         schema:
 *         - type: string
 *         required: true
 *         description: User's email
 *       - in: body
 *         name: password
 *         schema:
 *         - type: string
 *         required: true
 *         description: User's password
 *       - in: body
 *         name: phone
 *         schema:
 *         - type: integer
 *         required: true
 *         description: User's phone
 *       - in: body
 *         name: designation
 *         schema:
 *         - type: string
 *         required: true
 *         description: User's designation
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: success
 *      400:
 *        description: email already in use
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
 *    summary: Fetchs user profile
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
 * @Doctor Routes
 */

//get doctor based on categories
router.get(
  "/:categoryId",
  verifyLogin,
  wrapAsync(userController.doctorBasedOnCategory)
);

//get appointments according to doctor
router.get(
  "/appointments/:userId",
  verifyLogin,
  wrapAsync(userController.appointmentsAccToDoctor)
);

//for getting own appointment done by user
router.get(
  "/my/appointments",
  verifyLogin,
  wrapAsync(userController.getAppointmentOfUser)
);
module.exports = router;
