const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  record: {
    type: String,
    required: true,
  },
  eloRating: {
    type: Number,
    required: true,
    default: 2000, // Default ELO rating for new fighters
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
  fighter_id: {
    type: Number,
    unique: true, // Set unique constraint if you want it to be unique
    required: true, // Mark as required if necessary
  },
  profileImage: {
    // New field for profile image URL
    type: String,
    required: true, // Set to true if this field should be required
  },
  biography: {
    // New field for biography text
    type: String,
    required: true, // Set to true if this field should be required
  },
  eloHistory: {
    type: [Number], // Array of numbers to store ELO ratings
    default: [2000], // Start with base ELO rating
  },
  eloPerMatch: {
    type: [Number], // Array of numbers to store ELO ratings
    default: [],
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"], // Restrict values to 'Active' or 'Inactive'
    default: "Active", // Set default status
  },
});

module.exports = mongoose.model("Fighter", fighterSchema);
