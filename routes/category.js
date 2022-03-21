const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../middlewares/verifyLogin");
const categoryController = require("../controllers/category");
const { isAdmin } = require("../controllers/auth");
const { categoryValidation, editcategoryValidation } = require("../validation");
const handleError = require("../helper/handleError");
const { wrapAsync } = require("../helper/catchHandler");

//for getting single category
router.get(
  "/categories/:categoryId",
  wrapAsync(categoryController.readCategory)
);

//for creating the category
router.post(
  "/categories",
  categoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.createCategory)
);

//for getting all the categories
router.get("/categories", wrapAsync(categoryController.listCategory));

//for editing the category
router.put(
  "/categories/:categoryId",
  editcategoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.updateCategory)
);

//for deleting category
router.delete(
  "/categories/:categoryId",
  verifyLogin,
  isAdmin,
  wrapAsync(categoryController.removeCategory)
);

module.exports = router;
