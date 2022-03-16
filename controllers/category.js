const Category = require("../models/category");
const { errorHandler } = require("../helper/error");

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.listCategory = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.readCategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    const category = await Category.findById(req.params.categoryId);
    return res.status(200).json({
      status: "success",
      data: { category: category },
    });
  } catch (ex) {
    return res
      .status(400)
      .send({ status: "error", message: "cannot get category" });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    const category = await Category.findById(req.params.categoryId);
    if (req.body.name) {
      category.name = req.body.name;
    }
    const updatedCategory = await category.save();
    return res
      .status(200)
      .send({ status: "success", data: { category: updatedCategory } });
  } catch (ex) {
    return res
      .status(400)
      .send({ status: "error", message: "something went wrong" });
  }
};

exports.removeCategory = async (req, res) => {
  const id = req.params.categoryId;
  try {
    await Category.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ status: "sucess", message: "category deleted" });
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({ status: "error", message: ex.message });
  }
};
