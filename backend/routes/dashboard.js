const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Booking = require("../models/Booking");
const Expense = require("../models/Expense");

router.get("/summary", async (req, res) => {
  try {
    const cars = await Car.find();
    const data = [];

    for (const car of cars) {
      const bookings = await Booking.find({ carId: car._id });
      const expenses = await Expense.find({ carId: car._id });

      const totalDistance = bookings.reduce((sum, b) => sum + b.distance, 0);
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

      data.push({
        carName: car.name,
        totalBookings: bookings.length,
        totalDistance,
        totalExpenses,
        owners: car.owners
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
