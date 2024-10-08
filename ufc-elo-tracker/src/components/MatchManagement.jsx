import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchManagement = () => {
  const [fighterName, setFighterName] = useState("");
  const [isChampionship, setIsChampionship] = useState(0);
  const [result, setResult] = useState(1); // Default to win
  const [kd, setKd] = useState(0);
  const [sig, setSig] = useState(0); // New significant strikes field
  const [takedowns, setTakedowns] = useState(0);
  const [takedownDefended, setTakedownDefended] = useState(0);
  const [subAttempts, setSubAttempts] = useState(0);
  const [knockoutSub, setKnockoutSub] = useState(0); // Default to no
  const [ksubloss, setKsubloss] = useState(0); // Default to no
  const [fighters, setFighters] = useState([]); // Array to hold fighter names
  const [suggestions, setSuggestions] = useState([]); // Array for name suggestions

  useEffect(() => {
    // Fetch all fighters when the component mounts
    const fetchFighters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fighters");
        setFighters(response.data.map((fighter) => fighter.name)); // Assuming each fighter has a name property
      } catch (error) {
        console.error("Error fetching fighters:", error);
      }
    };

    fetchFighters();
  }, []);

  const handleFighterNameChange = (e) => {
    const value = e.target.value;
    setFighterName(value);

    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = fighters.filter((fighter) =>
        fighter.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (name) => {
    setFighterName(name);
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const matchDetails = {
      fighterName,
      isChampionship,
      result,
      kd,
      sig, // Include the significant strikes field
      takedowns,
      takedownDefended,
      subAttempts,
      knockoutSub,
      ksubloss,
    };

    console.log(matchDetails);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/addMatch",
        matchDetails
      );
      console.log(response.data);
      alert("Match added successfully!");
      // Reset the form after successful submission
      setFighterName("");
      setIsChampionship(0);
      setResult(1);
      setKd(0);
      setSig(0); // Reset significant strikes
      setTakedowns(0);
      setTakedownDefended(0);
      setSubAttempts(0);
      setKnockoutSub(0);
      setKsubloss(0);
      setSuggestions([]); // Clear suggestions after submission
    } catch (error) {
      console.error(error);
      alert("Error adding match. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-md border-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Add Match Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Fighter Name:
            </label>
            <input
              type="text"
              value={fighterName}
              onChange={handleFighterNameChange}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {suggestions.length > 0 && (
              <ul className="absolute text-black z-10 bg-white shadow-md rounded-md mt-1 max-h-40 overflow-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isChampionship}
              onChange={(e) => setIsChampionship(Number(e.target.checked))}
              className="mr-2"
            />
            <label className="text-white font-semibold">
              Is Championship Match
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Result:
            </label>
            <select
              value={result}
              onChange={(e) => setResult(Number(e.target.value))}
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value={1}>Win</option>
              <option value={0}>Loss</option>
              <option value={0.5}>Draw</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                Knockdowns:
              </label>
              <input
                type="number"
                value={kd}
                onChange={(e) => setKd(Number(e.target.value))}
                required
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Significant Strikes:
              </label>
              <input
                type="number"
                value={sig}
                onChange={(e) => setSig(Number(e.target.value))}
                required
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Takedowns:
              </label>
              <input
                type="number"
                value={takedowns}
                onChange={(e) => setTakedowns(Number(e.target.value))}
                required
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Takedown Defended:
              </label>
              <input
                type="number"
                value={takedownDefended}
                onChange={(e) => setTakedownDefended(Number(e.target.value))}
                required
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Submission Attempts:
              </label>
              <input
                type="number"
                value={subAttempts}
                onChange={(e) => setSubAttempts(Number(e.target.value))}
                required
                className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Knockout/Sub:
            </label>
            <select
              value={knockoutSub}
              onChange={(e) => setKnockoutSub(Number(e.target.value))}
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Knockout/Sub Loss:
            </label>
            <select
              value={ksubloss}
              onChange={(e) => setKsubloss(Number(e.target.value))}
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Add Match
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatchManagement;
