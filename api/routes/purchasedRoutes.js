const express = require("express");
const router = express.Router();
const Purchased = require("../models/Purchased");
const User = require("../models/User");

router.post("/purchase-ticket", async (req, res) => {
  const {
    userId,
    milesMemberNumber,
    flightId,
    paymentMethod,
    amount,
    milesUsed,
  } = req.body;

  try {
    const newPurchase = new Purchased({
      userId,
      milesMemberNumber,
      flightId,
      paymentMethod,
      amount,
      milesUsed,
    });

    const savedPurchase = await newPurchase.save();

    if (paymentMethod === "creditCard" && milesMemberNumber) {
      const milesPointsEarned = amount * 0.1;
      await User.findByIdAndUpdate(userId, {
        $inc: { milesPoints: milesPointsEarned },
      });
    }

    res.status(201).json(savedPurchase);
  } catch (error) {
    res.status(500).json({ message: "Error saving purchase", error });
  }
});

module.exports = router;
