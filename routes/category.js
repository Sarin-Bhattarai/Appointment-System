const express = require("express");
const router = express.Router();

const { verifyLogin } = require("../middlewares/verifyLogin");
const { createCategory, listCategory } = require("../controllers/category");
const { isAdmin } = require("../controllers/auth");

//for creating the category
router.post("/category/create/:userId", verifyLogin, isAdmin, createCategory);

//for getting all the categories
router.get("/categories", listCategory);

module.exports = router;
