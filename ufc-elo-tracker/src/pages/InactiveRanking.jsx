import React, { useEffect, useState } from "react";
import axios from "axios";

const InactivePage = () => {
  const [topFighters, setTopFighters] = useState([]);
  const [error, setError] = useState(""); // To track error states

  useEffect(() => {
    // Fetch sorted fighters from the backend
    axios
      .get("http://localhost:5000/api/fighters/inactive/sortedByOverallElo") // Explicit URL to avoid confusion
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setTopFighters(response.data); // Set the response data into state
        } else {
          setError("Unexpected response format");
        }
      })
      .catch(() => {
        setError("Failed to fetch fighters");
      });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col ">
      <main className="flex-grow mt-6 mb-12">
        <h2 className="text-3xl font-semibold text-center mt-4 mb-8 text-white">
          Top Active Fighters (Ranked by ELO)
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="overflow-x-auto mt-6 px-4 ">
          <table className="min-w-full border border-collapsemt-6 bg-gray-800 text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  Rank
                </th>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  Name
                </th>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  Country
                </th>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  Rating
                </th>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  Age
                </th>
                <th className="border px-4 py-2 text-center text-xl font-semibold">
                  UFC Record
                </th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {topFighters.length > 0 ? (
                topFighters.map((fighter, index) => (
                  <tr key={fighter._id} className="hover:bg-gray-600">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {fighter.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {fighter.flag}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {fighter.eloRating}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {fighter.age}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {fighter.record}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center">
                    No fighters available to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InactivePage;
