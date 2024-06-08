const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();

dotenv.config();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("MongoDB URI:", uri);

  if (!uri) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

const userRoutes = require("./routes/userRoutes");
const milesRoutes = require("./routes/milesRoutes");
const flightRoutes = require("./routes/flightRoutes");

app.use("/api/flights", flightRoutes);
app.use("/api", userRoutes);
app.use("/api", milesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
