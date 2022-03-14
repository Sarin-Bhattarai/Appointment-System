const { utc } = require("moment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var current = new Date();
const timeStamp = new Date(
  Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    current.getHours(),
    current.getMinutes(),
    current.getSeconds()
  )
);

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      default: timeStamp,
    },
    endTime: {
      type: Date,
      required: true,
      default: timeStamp,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "accepted",
      enum: ["accepted", "pending", "cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
