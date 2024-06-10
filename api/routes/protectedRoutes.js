const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authentication");

router.get("/protected-route", authenticateToken, async (req, res) => {
  try {
    const protectedData = {
      message: "This is a protected route",
      user: req.user,
    };

    res.status(200).json(protectedData);
  } catch (error) {
    console.error("Error in /protected-route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
