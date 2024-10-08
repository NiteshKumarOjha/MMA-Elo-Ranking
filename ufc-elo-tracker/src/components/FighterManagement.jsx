import React, { useState, useEffect } from "react";
import axios from "axios";

const FighterManagement = () => {
  const [fighters, setFighters] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [flag, setFlag] = useState("");
  const [record, setRecord] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [biography, setBiography] = useState("");
  const [editingFighterId, setEditingFighterId] = useState(null);

  // Define fetchFighters function here
  const fetchFighters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fighters");
      setFighters(response.data);
    } catch (error) {
      console.error("Error fetching fighters:", error);
    }
  };

  useEffect(() => {
    fetchFighters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fighterData = { name, age, flag, record, profileImage, biography };

    try {
      if (editingFighterId) {
        // Update existing fighter
        await axios.put(
          `http://localhost:5000/api/fighters/${editingFighterId}`,
          fighterData
        );
        alert("Fighter updated successfully!");
      } else {
        // Add new fighter
        await axios.post("http://localhost:5000/api/fighters", fighterData);
        alert("Fighter added successfully!");
      }
      resetForm();
      fetchFighters(); // Refresh fighter list
    } catch (error) {
      console.error(error);
      alert("Error saving fighter. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setAge(0);
    setFlag("");
    setRecord("");
    setProfileImage("");
    setBiography("");
    setEditingFighterId(null);
  };

  const handleEdit = (fighter) => {
    setName(fighter.name);
    setAge(fighter.age);
    setFlag(fighter.flag);
    setRecord(fighter.record);
    setProfileImage(fighter.profileImage);
    setBiography(fighter.biography);
    setEditingFighterId(fighter._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-md border-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Manage Fighters
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Flag URL:
            </label>
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Record:
            </label>
            <input
              type="text"
              value={record}
              onChange={(e) => setRecord(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Profile Image URL:
            </label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Biography:
            </label>
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              required
              className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-400 transition duration-300"
          >
            {editingFighterId ? "Update Fighter" : "Add Fighter"}
          </button>
        </form>
        <h3 className="text-lg font-bold mt-8 text-center text-orange-500">
          Fighter List
        </h3>
        <ul className="mt-4">
          {fighters.map((fighter) => (
            <li
              key={fighter._id}
              className="flex justify-between items-center bg-gray-700 p-2 rounded mb-2"
            >
              <span className="text-white">{fighter.name}</span>
              <button
                onClick={() => handleEdit(fighter)}
                className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-400"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FighterManagement;
