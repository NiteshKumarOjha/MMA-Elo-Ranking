const express = require("express");
const router = express.Router();
const Fighter = require("../models/Fighter");

// Get all fighters
router.get("/", async (req, res) => {
  try {
    const fighters = await Fighter.find({});
    res.json(fighters);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/sortedByElo", async (req, res) => {
  try {
    // Fetch all fighters and sort them by eloRating in descending order
    const fighters = await Fighter.find().sort({ eloRating: -1 });
    res.status(200).json(fighters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching fighters" });
  }
});

router.get("/alphabetical", async (req, res) => {
  try {
    // Fetch all fighters and sort them by eloRating in descending order
    const fighters = await Fighter.find().sort({ name: 1 });
    res.status(200).json(fighters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching fighters" });
  }
});

router.get("/:fighterId", async (req, res) => {
  try {
    const fighterId = req.params.fighterId;
    const fighter = await Fighter.findById(fighterId);
    if (!fighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }
    res.json(fighter);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Server error", error: error.message }); // Send structured error response
  }
});

// Add a new fighter (for testing purposes)
const generateUniqueFighterId = async () => {
  const count = await Fighter.countDocuments(); // Get current number of fighters
  return count + 1; // Simple way to assign unique IDs
};

// Usage in your route
router.post("/", async (req, res) => {
  const { name, age, flag, record, profileImage, biography } = req.body;
  const fighterId = await generateUniqueFighterId(); // Generate a unique fighter_id
  const newFighter = new Fighter({
    name,
    age,
    flag,
    record,
    fighter_id: fighterId,
    profileImage,
    biography,
  });
  try {
    const fighter = await Fighter.findOne({ name });
    if (fighter) {
      return res.status(404).json({ message: "Fighter already exists" });
    }
    await newFighter.save();
    res.status(201).json(newFighter);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update an existing fighter
router.put("/:fighterId", async (req, res) => {
  const { name, age, flag, record, profileImage, biography } = req.body;
  try {
    const fighter = await Fighter.findByIdAndUpdate(
      req.params.fighterId,
      { name, age, flag, record, profileImage, biography },
      { new: true, runValidators: true } // Return the updated document and validate it
    );

    if (!fighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }

    res.json(fighter);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating fighter", error });
  }
});

module.exports = router;
