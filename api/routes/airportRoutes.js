const express = require("express");
const router = express.Router();
const cache = require("../services/cache");

const airportData = [
  { code: "IST", name: "Istanbul Airport" },
  { code: "LAX", name: "Los Angeles International Airport" },
];

router.get("/airports", (req, res) => {
  const cacheKey = "airports";

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Data retrieved from cache");
    return res.json(cachedData);
  }
  console.log("Data retrieved from database");
  cache.set(cacheKey, airportData);
  res.json(airportData);
});

module.exports = router;
