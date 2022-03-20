const Appointment = require("../models/appointment");
const { errorHandler } = require("../helper/error");
const moment = require("moment");

exports.getAppointment = (req, res) => {
  Appointment.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.createAppointment = async (req, res) => {
  try {
    const beginsAt = req.body.beginsAt;
    const endsAt = req.body.endsAt;
    const appointmentDetails = {
      title: req.body.title,
      startTime: moment(req.body.date + " " + beginsAt),
      endTime: moment(req.body.date + " " + endsAt),
      user: req.body.user,
      status: req.body.status,
    };
    const appointment = new Appointment(appointmentDetails);
    const result = await appointment.save();
    return res.json({ status: "success", data: { appointment: result } });
  } catch (ex) {
    return res.json({ status: "error", message: ex.message });
  }
};

exports.editAppointment = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (req.body.title) {
      appointment.title = req.body.title;
    }
    if (req.body.status) {
      appointment.status = req.body.status;
    }
    const result = await appointment.save();
    return res
      .status(200)
      .json({ status: "success", data: { appointment: result } });
  } catch (ex) {
    return res
      .status(400)
      .json({ status: "error", message: "something went wrong" });
  }
};

exports.deleteAppointment = async (req, res) => {
  const id = req.params.appointmentId;
  try {
    await Appointment.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ status: "sucess", message: "appointment deleted" });
  } catch (ex) {
    console.log(ex);
    return res.status(400).json({ status: "error", message: ex.message });
  }
};

exports.readSingleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    return res.status(200).json({
      status: "success",
      data: { appointment: appointment },
    });
  } catch (ex) {
    return res
      .status(400)
      .json({ status: "error", message: "cannot get appointment" });
  }
};
