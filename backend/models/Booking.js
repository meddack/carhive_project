const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  user: String,
  date: String,
  startTime: String,
  endTime: String,
  distance: Number
});

module.exports = mongoose.model("Booking", BookingSchema);
