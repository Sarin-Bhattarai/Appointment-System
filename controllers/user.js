const User = require("../models/user");

module.exports = {
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
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(400).json({
          status: "Success",
          message: "Something went wrong, Please try again!",
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
        status: "Success",
        data: {
          user: updatedDetails,
        },
      });
    } catch (ex) {
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  },
};
