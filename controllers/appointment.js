const Appointment = require("../models/appointment");
const moment = require("moment");

exports.getAppointment = async (req, res) => {
  const appointment = await Appointment.find();
  return res.status(200).json({
    message: "success",
    data: { appointment: appointment },
  });
};

exports.createAppointment = async (req, res) => {
  const beginsAt = req.body.beginsAt;
  const endsAt = req.body.endsAt;
  const appointmentDetails = {
    title: req.body.title,
    startTime: moment(req.body.date + " " + beginsAt),
    endTime: moment(req.body.date + " " + endsAt),
    appointmentWith: req.body.appointmentWith,
    appointmentFor: req.user._id,
    status: req.body.status,
  };
  const appointment = new Appointment(appointmentDetails);
  const result = await appointment.save();
  return res.json({ status: "success", data: { appointment: result } });
};

exports.editAppointment = async (req, res) => {
  const appointmentId = req.params.appointmentId;
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
};

exports.deleteAppointment = async (req, res) => {
  const id = req.params.appointmentId;
  await Appointment.deleteOne({ _id: id });
  return res
    .status(200)
    .json({ status: "sucess", message: "appointment deleted" });
};

exports.readSingleAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.appointmentId);
  return res.status(200).json({
    status: "success",
    data: { appointment: appointment },
  });
};
