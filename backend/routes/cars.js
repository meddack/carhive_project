const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Add a car
router.post("/add", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars
router.get("/all", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

module.exports = router;
