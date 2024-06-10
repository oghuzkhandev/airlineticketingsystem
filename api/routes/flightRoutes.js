const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const User = require("../models/User");
const mongoose = require("mongoose");

router.post("/add-flight", async (req, res) => {
  const {
    flightDate,
    flightCode,
    milesPoints,
    capacity,
    from,
    to,
    flightDuration,
    operatedBy,
    economyPrice,
    businessPrice,
  } = req.body;
  const flight = new Flight({
    flightDate,
    flightCode,
    milesPoints,
    capacity,
    from,
    to,
    flightDuration,
    operatedBy,
    economyPrice,
    businessPrice,
  });

  try {
    const newFlight = await flight.save();
    res
      .status(201)
      .json({ message: "Flight added successfully.", flight: newFlight });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/search-flights", async (req, res) => {
  const { from, to, startDate, endDate, userId } = req.query;

  try {
    const flights = await Flight.find({
      from,
      to,
      flightDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    let isMilesMember = false;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      isMilesMember = user ? user.isMilesMember : false;
    }

    const updatedFlights = flights.map((flight) => {
      return {
        ...flight.toObject(),
        economyMilesPoints: flight.milesPoints,
        businessMilesPoints: flight.milesPoints * 4,
      };
    });

    res.status(200).json({ flights: updatedFlights, isMilesMember });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update-capacity/:flightId", async (req, res) => {
  const { flightId } = req.params;
  const { passengers, useMiles, userId, classType } = req.body;

  console.log("Received flightId:", flightId);
  console.log("Received userId:", userId);

  if (!mongoose.Types.ObjectId.isValid(flightId)) {
    return res.status(400).json({ message: "Invalid flightId format" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (useMiles) {
      if (!user.isMilesMember) {
        return res
          .status(400)
          .json({ message: "User is not a Miles&Smiles member" });
      }
      const totalMilesRequired = flight.milesPoints * passengers;
      if (user.milesPoints < totalMilesRequired) {
        return res.status(400).json({ message: "Insufficient Miles points" });
      }
      user.milesPoints -= totalMilesRequired;
      await user.save();
    } else {
      const pricePerPassenger =
        classType === "Economy" ? flight.economyPrice : flight.businessPrice;
      const totalPrice = pricePerPassenger * passengers;
      // Ödeme işleme mantığı burada olabilir
    }

    flight.capacity -= passengers;
    await flight.save();

    res
      .status(200)
      .json({ message: "Flight capacity updated successfully", flight });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

router.get("/locations", async (req, res) => {
  try {
    const fromLocations = await Flight.distinct("from");
    const toLocations = await Flight.distinct("to");
    res.status(200).json({ fromLocations, toLocations });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
