const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/miles-signup", async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    dateOfBirth,
    country,
    city,
    gender,
  } = req.body;
  const user = new User({
    firstName,
    lastName,
    username,
    password,
    email,
    dateOfBirth,
    country,
    city,
    gender,
    isMilesMember: true,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      message: `${newUser.username} has been successfully added as a Miles&Smiles member.`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/miles-members", async (req, res) => {
  try {
    const members = await User.find({ isMilesMember: true });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
