const mongoose = require("mongoose");

const purchasedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  milesMemberNumber: {
    type: String,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["creditCard", "miles"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  milesUsed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Purchased", purchasedSchema);
