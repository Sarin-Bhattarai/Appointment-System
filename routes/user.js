const express = require("express");
const { registerUserValidation } = require("../validation");
const handleError = require("../helper/handleError");
const userController = require("../controllers/user");
const { verifyLogin } = require("../middlewares/verifyLogin");
const { wrapAsync } = require("../helper/catchHandler");

const router = express.Router();

/**
 * @User Routes
 */

//for registering the User
router.post(
  "/register",
  registerUserValidation(),
  handleError,
  wrapAsync(userController.registerUser)
);

//user profile get and update
router.get("/", verifyLogin, wrapAsync(userController.profile));

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
module.exports = router;
