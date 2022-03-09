const express = require("express");
const router = express.Router();

const { verifyLogin } = require("../middlewares/verifyLogin");
const {
  createCategory,
  listCategory,
  readCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isAdmin } = require("../controllers/auth");
const { categoryValidation, editcategoryValidation } = require("../validation");
const handleError = require("../helper/handleError");

//for getting single category
router.get("/category/:categoryId", readCategory);

//for creating the category
router.post(
  "/category/create/:userId",
  categoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  createCategory
);

//for getting all the categories
router.get("/categories", listCategory);

//for editing the category
router.put(
  "/category/:categoryId",
  editcategoryValidation(),
  handleError,
  verifyLogin,
  isAdmin,
  updateCategory
);

//for deleting category
router.delete("/category/:categoryId", verifyLogin, isAdmin, removeCategory);

module.exports = router;
