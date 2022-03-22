const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    appointmentWith: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    appointmentFor: {
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
      enum: ["accepted", "pending", "rejected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
