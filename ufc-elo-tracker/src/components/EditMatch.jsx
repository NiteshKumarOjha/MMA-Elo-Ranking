import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMatches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fighters, setFighters] = useState([]);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [matches, setMatches] = useState([]);
  const [editableMatch, setEditableMatch] = useState(null);

  // Fetch fighters when search query changes
  useEffect(() => {
    const fetchFighters = async () => {
      if (searchQuery.length > 2) {
        // Fetch only when the query length is greater than 2
        try {
          const response = await axios.get(
            `http://localhost:5000/api/fighters?search=${searchQuery}`
          );
          setFighters(response.data);
        } catch (error) {
          console.error("Error fetching fighters:", error);
        }
      } else {
        setFighters([]); // Clear fighters when search is less than 3 characters
      }
    };

    fetchFighters();
  }, [searchQuery]);

  // Fetch matches of the selected fighter
  const handleSelectFighter = async (fighterId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/matches/fighter/${fighterId}`
      );
      setMatches(response.data);
      setSelectedFighter(fighterId);
      setFighters([]); // Clear the fighter list after selection
      setEditableMatch(null); // Clear any editing state
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleMatchEdit = (match) => {
    setEditableMatch(match);
  };

  const handleSaveEdit = (matchId) => {
    axios
      .put(`http://localhost:5000/api/matches/${matchId}`, editableMatch)
      .then((response) => {
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match._id === matchId ? response.data : match
          )
        );
        alert("Match updated successfully!");
        setEditableMatch(null);
      })
      .catch((error) => {
        console.error("Error updating match:", error);
        alert("Failed to update match.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "isChampionship" ||
      name === "result" ||
      name === "knockoutSub" ||
      name === "ksubloss" ||
      name === "firstRoundFinish"
        ? parseFloat(value)
        : value;

    setEditableMatch((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Matches</h2>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 w-full rounded bg-gray-700 text-white"
          placeholder="Search Fighter by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {fighters.length > 0 && (
        <ul className="bg-gray-800 rounded-lg p-4">
          {fighters.map((fighter) => (
            <li
              key={fighter._id}
              className="p-2 hover:bg-gray-600 cursor-pointer rounded-lg"
              onClick={() => handleSelectFighter(fighter._id)}
            >
              {fighter.name}
            </li>
          ))}
        </ul>
      )}

      {matches.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            Matches for Selected Fighter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
              <div key={match._id} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold">Match {match._id}</h4>
                <p>
                  Result:{" "}
                  {match.result === 1
                    ? "Win"
                    : match.result === 0
                    ? "Loss"
                    : "Draw"}
                </p>
                <p>Knockdowns: {match.kd}</p>
                <p>Significant Strikes: {match.sig}</p>
                <p>Takedowns: {match.takedowns}</p>
                <p>Submission Attempts: {match.subAttempts}</p>
                <p>Championship Match: {match.isChampionship ? "Yes" : "No"}</p>
                <p>Knockout Submission: {match.knockoutSub ? "Yes" : "No"}</p>
                <p>KSU Loss: {match.ksubloss ? "Yes" : "No"}</p>
                <p>
                  First Round Finish: {match.firstRoundFinish ? "Yes" : "No"}
                </p>

                {editableMatch?._id === match._id ? (
                  <div className="mt-2">
                    <label className="block mb-1">Knockdowns:</label>
                    <input
                      type="number"
                      name="kd"
                      value={editableMatch.kd}
                      onChange={handleInputChange}
                      placeholder="Knockdowns"
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    />
                    <label className="block mb-1">Significant Strikes:</label>
                    <input
                      type="number"
                      name="sig"
                      value={editableMatch.sig}
                      onChange={handleInputChange}
                      placeholder="Significant Strikes"
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    />
                    <label className="block mb-1">Takedowns:</label>
                    <input
                      type="number"
                      name="takedowns"
                      value={editableMatch.takedowns}
                      onChange={handleInputChange}
                      placeholder="Takedowns"
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    />
                    <label className="block mb-1">Submission Attempts:</label>
                    <input
                      type="number"
                      name="subAttempts"
                      value={editableMatch.subAttempts}
                      onChange={handleInputChange}
                      placeholder="Submission Attempts"
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    />
                    <label className="block mb-1">Result:</label>
                    <select
                      name="result"
                      value={editableMatch.result}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    >
                      <option value={1}>Win</option>
                      <option value={0}>Loss</option>
                      <option value={0.5}>Draw</option>
                    </select>
                    <label className="block mb-1">Championship Match:</label>
                    <select
                      name="isChampionship"
                      value={editableMatch.isChampionship}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                    <label className="block mb-1">Knockout Submission:</label>
                    <select
                      name="knockoutSub"
                      value={editableMatch.knockoutSub}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                    <label className="block mb-1">KSU Loss:</label>
                    <select
                      name="ksubloss"
                      value={editableMatch.ksubloss}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                    <label className="block mb-1">First Round Finish:</label>
                    <select
                      name="firstRoundFinish"
                      value={editableMatch.firstRoundFinish}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white mb-2 w-full"
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                    <button
                      className="mt-2 bg-blue-600 p-2 rounded text-white"
                      onClick={() => handleSaveEdit(match._id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 bg-green-600 p-2 rounded text-white"
                    onClick={() => handleMatchEdit(match)}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMatches;
