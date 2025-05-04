const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  type: String,
  amount: Number,
  user: String,
  date: String
});

module.exports = mongoose.model("Expense", ExpenseSchema);
