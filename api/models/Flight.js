const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightDate: { type: Date, required: true },
  flightCode: { type: String, required: true },
  milesPoints: { type: Number, required: true },
  capacity: { type: Number, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  flightDuration: { type: String, required: true },
  operatedBy: { type: String, required: true },
  economyPrice: { type: Number, required: true },
  businessPrice: { type: Number, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
