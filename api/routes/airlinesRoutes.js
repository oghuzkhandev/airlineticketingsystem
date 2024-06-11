const express = require("express");
const router = express.Router();
const cache = require("../services/cache");

const airlineDestinations = [
  { airline: "THY", destinations: ["IST", "LAX", "JFK"] },
  { airline: "Delta", destinations: ["ATL", "LAX", "JFK"] },
];

router.get("/airline-destinations", (req, res) => {
  const cacheKey = "airline-destinations";

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Data retrieved from cache");
    return res.json(cachedData);
  }

  console.log("Data retrieved from database");
  cache.set(cacheKey, airlineDestinations);
  res.json(airlineDestinations);
});

module.exports = router;
