const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middlewares/authentication");

router.post("/update-miles", authenticateToken, async (req, res) => {
  const { milesMemberNumber, points } = req.body;

  try {
    const user = await User.findOne({ milesMemberNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.milesPoints += points;
    await user.save();

    res.status(200).json({ message: "Miles points updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating miles points", error });
  }
});

module.exports = router;
