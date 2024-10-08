// src/pages/AdminPanel.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    fighterName: "",
    opponent: "",
    result: "", // 1 for win, 0 for loss
    preFightOdds: 0,
    kd: 0,
    totalStrikes: 0,
    sigStrikes: 0,
    takedowns: 0,
    subAttempts: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/addMatch", formData);
      alert("Match successfully added");
    } catch (error) {
      console.error(error);
      alert("Error adding match");
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <label>Fighter Name:</label>
        <input
          type="text"
          name="fighterName"
          value={formData.fighterName}
          onChange={handleInputChange}
          required
        />

        <label>Opponent:</label>
        <input
          type="text"
          name="opponent"
          value={formData.opponent}
          onChange={handleInputChange}
          required
        />

        <label>Result (1 for win, 0 for loss):</label>
        <input
          type="number"
          name="result"
          value={formData.result}
          onChange={handleInputChange}
          required
        />

        {/* Additional input fields for match statistics */}
        <label>Total Strikes:</label>
        <input
          type="number"
          name="totalStrikes"
          value={formData.totalStrikes}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit Match</button>
      </form>
    </div>
  );
};

export default AdminPanel;
