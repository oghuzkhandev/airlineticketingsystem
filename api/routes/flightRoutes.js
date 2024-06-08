const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route to add a flight
router.post("/add-flight", isAdmin, async (req, res) => {
  const { flightDate, flightCode, milesPoints, capacity } = req.body;
  try {
    const flight = new Flight({
      flightDate,
      flightCode,
      milesPoints,
      capacity,
    });
    const newFlight = await flight.save();
    res
      .status(201)
      .json({ message: `Flight ${newFlight.flightCode} added successfully.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
