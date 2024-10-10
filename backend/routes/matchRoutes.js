const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

// Get fighters based on search query
router.get("/fighters", async (req, res) => {
  const { search } = req.query; // Get the search query from the request

  if (!search) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    // Find fighters that match the search query (case insensitive)
    const fighters = await Fighter.find({
      name: { $regex: search, $options: "i" }, // Case insensitive regex search
    });

    res.status(200).json(fighters); // Send the matched fighters
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching fighters." });
  }
});

// Get all matches for a specific fighter
router.get("/fighter/:fighterId", async (req, res) => {
  try {
    const { fighterId } = req.params;
    const matches = await Match.find({ fighter: fighterId }).populate(
      "fighter"
    );
    if (!matches) {
      return res
        .status(404)
        .json({ message: "No matches found for this fighter." });
    }
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching matches." });
  }
});

// Update a specific match
router.put("/:matchId", async (req, res) => {
  const { matchId } = req.params;
  let matchData = req.body;

  // Convert boolean values to numbers
  if (matchData.isChampionship !== undefined) {
    matchData.isChampionship = matchData.isChampionship ? 1 : 0; // Convert true to 1, false to 0
  }

  if (matchData.result !== undefined) {
    matchData.result = matchData.result ? 1 : 0; // Similarly convert result to 1 or 0
  }

  try {
    const updatedMatch = await Match.findByIdAndUpdate(matchId, matchData, {
      new: true,
      runValidators: true,
    });
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found." });
    }
    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating match." });
  }
});

module.exports = router;
