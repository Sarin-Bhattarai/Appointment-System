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
