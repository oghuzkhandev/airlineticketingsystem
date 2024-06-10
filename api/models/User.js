const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  gender: { type: String, required: false },
  isMilesMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  milesPoints: { type: Number, default: 0 },
  milesMemberNumber: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
