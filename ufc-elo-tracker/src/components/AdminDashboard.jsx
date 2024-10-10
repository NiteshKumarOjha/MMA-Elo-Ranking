import React from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const handleRecalculateELO = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recalculateAllElo"
      );
      if (response.status === 200) {
        alert("ELO recalculated for all fighters successfully!");
      } else {
        alert("Failed to recalculate ELO. Please try again.");
      }
    } catch (error) {
      console.error("Error recalculating ELO:", error);
      alert("An error occurred during the ELO recalculation.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6 shadow-md">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </header>
      <nav className="bg-gray-700 p-6">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="matches"
              className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300 shadow-md text-center"
            >
              Match Management
            </Link>
          </li>
          <li>
            <Link
              to="fighters"
              className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300 shadow-md text-center"
            >
              Fighter Management
            </Link>
          </li>
          <li>
            <button
              onClick={handleRecalculateELO}
              className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300 shadow-md font-semibold text-center"
            >
              Recalculate ELO
            </button>
          </li>
          <li>
            <Link
              to="edit-matches"
              className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300 shadow-md text-center"
            >
              Edit Matches
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
