const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  registerUser: async (req, res) => {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      designation: req.body.designation,
      role: req.body.role,
    };
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    User.find({ email: req.body.email }, async (error, user) => {
      if (error) {
        return res
          .status(400)
          .json({ status: "error", message: error.message });
      }
      if (user.length > 0) {
        return res.status(500).json({
          status: "fail",
          data: { user: "user is already registered" },
        });
      } else {
        const user = new User(userData);
        const result = await user.save();
        return res
          .status(200)
          .json({ status: "success", data: { user: user } });
      }
    });
  },

  profile: (req, res, next) => {
    return res.status(200).json({
      status: "success",
      data: {
        profile: req.user,
      },
    });
  },

  updateProfile: async (req, res, next) => {
    const { name, phone, designation, category } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        status: "success",
        message: "something went wrong, please try again!",
      });
    }
    if (name) {
      user.name = name;
    }
    if (phone) {
      user.phone = phone;
    }

    if (designation) {
      user.designation = designation;
    }
    if (category) {
      user.category = category;
    }
    const updatedDetails = await user.save();
    return res.status(200).json({
      status: "success",
      data: {
        user: updatedDetails,
      },
    });
  },
};
