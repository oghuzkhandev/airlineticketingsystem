const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  sendWelcomeEmail,
  sendPointsUpdateEmail,
} = require("../services/emailService");
const authenticateToken = require("../middlewares/authentication");

router.post("/miles-signup", async (req, res) => {
  try {
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

    if (!firstName || !lastName || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const milesMemberNumber = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      email,
      dateOfBirth,
      country,
      city,
      gender,
      isMilesMember: true,
      milesMemberNumber,
    });

    const newUser = await user.save();
    await sendWelcomeEmail(email, username);
    res.status(201).json({
      message: `${newUser.username} has been successfully added as a Miles&Smiles member.`,
      milesMemberNumber: newUser.milesMemberNumber,
    });
  } catch (error) {
    console.error("Error during miles-signup:", error);
    res.status(400).json({ message: error.message });
  }
});

router.post(
  "/send-points-update-email",
  authenticateToken,
  async (req, res) => {
    const { email, firstName, points } = req.body;

    try {
      await sendPointsUpdateEmail(email, firstName, points);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email", error });
    }
  }
);

router.get("/miles-members", async (req, res) => {
  try {
    const members = await User.find({ isMilesMember: true });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/miles-member/:milesMemberNumber", async (req, res) => {
  const { milesMemberNumber } = req.params;

  try {
    const user = await User.findOne({ milesMemberNumber, isMilesMember: true });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Miles&Smiles member not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Miles&Smiles member.", error });
  }
});

module.exports = router;
