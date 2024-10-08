// FightersPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FightersPage = () => {
  const [fighters, setFighters] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch fighters sorted alphabetically from the backend
    axios
      .get("http://localhost:5000/api/fighters/alphabetical")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setFighters(response.data);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch(() => {
        setError("Failed to fetch fighters");
      });
  }, []);

  // Group fighters by the first letter of their names
  const groupedFighters = fighters.reduce((acc, fighter) => {
    const firstLetter = fighter.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(fighter);
    return acc;
  }, {});

  // Filter fighters based on search term
  const filteredFighters = Object.keys(groupedFighters).reduce(
    (acc, letter) => {
      const fightersInGroup = groupedFighters[letter].filter((fighter) =>
        fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (fightersInGroup.length > 0) {
        acc[letter] = fightersInGroup;
      }
      return acc;
    },
    {}
  );

  // Navigate to fighter details page
  const handleFighterClick = (fighterId) => {
    navigate(`/database/${fighterId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col p-6">
      <h2 className="text-3xl font-semibold text-center mt-4 text-white">
        All Fighters (Alphabetical Order)
      </h2>
      <input
        type="text"
        placeholder="Search for a fighter..."
        className="mt-10 p-2 rounded bg-gray-800 text-white w-full md:w-1/2 mx-auto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(filteredFighters).length > 0 ? (
          Object.keys(filteredFighters).map((letter) => (
            <div key={letter} className="mt-6">
              <h3 className="text-2xl text-white font-semibold">{letter}</h3>
              <div className="grid grid-cols-1 gap-4 mt-2">
                {filteredFighters[letter].map((fighter) => (
                  <div
                    key={fighter._id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => handleFighterClick(fighter._id)}
                  >
                    <h4 className="text-xl text-white">{fighter.name}</h4>
                    <p className="text-gray-400">Country: {fighter.flag}</p>
                    <p className="text-gray-400">Rating: {fighter.eloRating}</p>
                    <p className="text-gray-400">Age: {fighter.age}</p>
                    <p className="text-gray-400">
                      UFC Record: {fighter.record}
                    </p>
                    <p className="text-gray-400">Status: {fighter.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            No fighters available to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default FightersPage;
