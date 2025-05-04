const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owners: [{ type: String, required: true }], // list of user names
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Car", CarSchema);
