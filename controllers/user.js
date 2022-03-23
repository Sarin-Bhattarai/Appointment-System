const User = require("../models/user");
const Appointment = require("../models/appointment");
const bcrypt = require("bcrypt");

module.exports = {
  registerUser: async (req, res) => {
    const inspectUser = await User.findOne({ email: req.body.email });
    if (inspectUser) {
      return res.status(400).json({
        status: "error",
        message: "email already in use",
      });
    }
    const newUser = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const result = await newUser.save();
    return res.status(200).json({
      status: "success",
      data: { user: result },
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
        status: "error",
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

  /**
   * @Doctor Controllers
   */

  doctorBasedOnCategory: async (req, res) => {
    const user = await User.find({ category: req.params.categoryId });
    return res.status(200).json({
      status: "success",
      data: { user: user },
    });
  },

  appointmentsAccToDoctor: async (req, res) => {
    const appointment = await Appointment.find({
      appointmentWith: req.params.userId,
    });
    return res.status(200).json({
      status: "success",
      data: { appointment: appointment },
    });
  },

  getAppointmentOfUser: async (req, res) => {
    const appointment = await Appointment.find({
      appointmentFor: req.user._id,
    });
    return res.status(200).json({
      status: "success",
      data: { appointment: appointment },
    });
  },
};
