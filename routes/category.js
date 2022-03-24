const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../middlewares/verifyLogin");
const categoryController = require("../controllers/category");
const { isAdmin } = require("../controllers/auth");
const { categoryValidation, editcategoryValidation } = require("../validation");
const handleError = require("../helper/handleError");
const { wrapAsync } = require("../helper/catchHandler");

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *    tags:
 *      - Category
 *    summary: fetch single category
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

router.get("/:categoryId", wrapAsync(categoryController.readCategory));

/**
 * @swagger
 * /api/categories:
 *   post:
 *    tags:
 *      - Category
 *    summary: create category
 *    security:
 *      -  BearerAuth: [Admin]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: body
 *      name: name
 *      description: category name
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: success
 */
router.post(
  "/",
  categoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.createCategory)
);

/**
 * @swagger
 * /api/categories:
 *   get:
 *    tags:
 *      - Category
 *    summary: fetch all categories
 *    produces:
 *    -application/json
 *    responses:
 *        200:
 *          description: success
 */

router.get("/", wrapAsync(categoryController.listCategory));

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *    tags:
 *      - Category
 *    summary: update category
 *    security:
 *      -  BearerAuth: [Admin]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: categoryId
 *      description: categoryId
 *      required: true
 *      type: string
 *    - in: body
 *      name: name
 *      description: category name
 *      required: true
 *      type: string
 *    responses:
 *        200:
 *          description: updates category
 */
router.put(
  "/:categoryId",
  editcategoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.updateCategory)
);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *    tags:
 *      - Category
 *    summary: delete category
 *    security:
 *      -  BearerAuth: [Admin]
 *    produces:
 *    -application/json
 *    parameters:
 *    - in: path
 *      name: categoryId
 *      description: categoryId
 *      required: true
 *    responses:
 *        200:
 *          description: success
 */

router.delete(
  "/:categoryId",
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.removeCategory)
);

module.exports = router;
