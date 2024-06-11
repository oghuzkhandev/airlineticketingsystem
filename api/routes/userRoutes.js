const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

router.post("/signup", async (req, res) => {
  const { username, password, email, isMilesMember } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let milesMemberNumber = null;
    if (isMilesMember) {
      milesMemberNumber = Math.floor(1000 + Math.random() * 9000).toString();
    }

    const user = new User({
      username,
      password: hashedPassword,
      email,
      isMilesMember,
      milesMemberNumber,
    });

    const newUser = await user.save();
    res.status(201).json({
      message: `${newUser.username} added successfully.`,
      milesMemberNumber: newUser.milesMemberNumber,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return res.status(400).json({ message: "Username is already taken." });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isAdmin = user.username === "oghuzkhan";

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin,
        username: user.username,
        firstName: user.firstName,
        email: user.email,
        isMilesMember: user.isMilesMember,
        milesMemberNumber: user.milesMemberNumber,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      isAdmin,
      username: user.username,
      firstName: user.firstName,
      email: user.email,
      isMilesMember: user.isMilesMember,
      userId: user._id,
      milesMemberNumber: user.milesMemberNumber,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/finduserbyid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
