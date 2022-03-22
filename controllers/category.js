const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  const result = await category.save();
  return res.status(200).json({
    message: "success",
    data: { result: result },
  });
};

exports.listCategory = async (req, res) => {
  const category = await Category.find();
  return res.status(200).json({
    message: "success",
    data: { category: category },
  });
};

exports.readCategory = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);
    return res.status(200).json({
      status: "success",
      data: { category: category },
    });
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (req.body.name) {
    category.name = req.body.name;
  }
  const updatedCategory = await category.save();
  return res
    .status(200)
    .json({ status: "success", data: { category: updatedCategory } });
};

exports.removeCategory = async (req, res) => {
  const id = req.params.categoryId;
  await Category.deleteOne({ _id: id });
  return res
    .status(200)
    .json({ status: "sucess", message: "category deleted" });
};
