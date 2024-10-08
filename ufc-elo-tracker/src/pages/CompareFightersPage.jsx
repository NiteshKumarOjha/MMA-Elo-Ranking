import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CompareFightersPage = () => {
  const [fighters, setFighters] = useState([]);
  const [selectedFighters, setSelectedFighters] = useState([]);
  const [eloData, setEloData] = useState([]);
  const [compareOption, setCompareOption] = useState("eloHistory"); // Default comparison type

  // Fetch all fighters on component mount
  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fighters");
        setFighters(response.data);
      } catch (error) {
        console.error("Error fetching fighters:", error);
      }
    };

    fetchFighters();
  }, []);

  // Handle selection of fighters from dropdown
  const handleFighterSelection = (selectedOptions) => {
    const fighterIds = selectedOptions.map((option) => option.value);
    setSelectedFighters(fighterIds);
  };

  // Fetch ELO history for selected fighters
  useEffect(() => {
    const fetchEloData = async () => {
      if (selectedFighters.length > 0) {
        try {
          const responses = await Promise.all(
            selectedFighters.map((fighterId) =>
              axios.get(`http://localhost:5000/api/fighters/${fighterId}`)
            )
          );

          const data = responses.map((response) => ({
            name: response.data.name,
            eloHistory: response.data.eloHistory || [],
            eloPerMatch: response.data.eloPerMatch || [], // Assuming this field exists
          }));

          setEloData(data);
        } catch (error) {
          console.error("Error fetching ELO data:", error);
        }
      }
    };

    fetchEloData();
  }, [selectedFighters]);

  // Prepare chart data
  const data = {
    labels:
      eloData.length > 0
        ? compareOption === "lastFive"
          ? ["Match 1", "Match 2", "Match 3", "Match 4", "Match 5"].slice(
              0,
              Math.min(eloData[0].eloPerMatch.length, 5)
            ) // Limit to available matches
          : [
              "Base",
              ...eloData[0].eloHistory.map((_, index) => `Match ${index + 1}`),
            ]
        : [],
    datasets: eloData.map((fighter, index) => ({
      label: fighter.name,
      data:
        compareOption === "lastFive"
          ? fighter.eloPerMatch.slice(-5)
          : fighter.eloHistory,
      fill: false,
      backgroundColor:
        index === 0
          ? "rgba(255, 99, 132, 0.5)"
          : index === 1
          ? "rgba(54, 162, 235, 0.5)"
          : "rgba(75, 192, 192, 0.5)", // Bright colors for multiple fighters
      borderColor:
        index === 0
          ? "rgba(255, 99, 132, 1)"
          : index === 1
          ? "rgba(54, 162, 235, 1)"
          : "rgba(75, 192, 192, 1)", // Border colors
      pointBackgroundColor: "white", // Highlight points
    })),
  };

  // Chart options with styling and responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  // Fighter selection options for dropdown
  const fighterOptions = fighters.map((fighter) => ({
    value: fighter._id,
    label: fighter.name,
  }));

  // Options for comparison type
  const comparisonOptions = [
    { value: "eloHistory", label: "ELO History" },
    { value: "lastFive", label: "Last 5 Matches" },
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Compare Fighters</h1>
      <div className="mb-4 md:flex items-center gap-6">
        <h2 className="text-xl text-white mb-2">Select Fighters:</h2>
        <Select
          isMulti
          options={fighterOptions}
          onChange={handleFighterSelection}
          className="max-w-lg w-full md:w-2/3"
          placeholder="Select up to 3 fighters"
          isSearchable
          maxMenuHeight={200}
          styles={{
            placeholder: (base) => ({
              ...base,
              fontSize: "1rem",
              color: "#ccc", // Adjust placeholder color
            }),
          }}
        />
      </div>
      <div className="mb-4 md:flex items-center gap-11">
        <h2 className="text-xl text-white mb-2">Compare By:</h2>
        <Select
          options={comparisonOptions}
          onChange={(selectedOption) => setCompareOption(selectedOption.value)}
          className="max-w-lg w-full md:w-2/3"
          placeholder="Select comparison type"
        />
      </div>
      {eloData.length > 0 && (
        <div className="flex justify-center items-center mt-16 md:mt-6 mb-6">
          <div className="w-full sm:w-4/5 lg:w-[80%] h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] max-h-[80vh] mb-8">
            <h3 className="text-2xl font-semibold text-white text-center mb-4">
              ELO Rating Comparison
            </h3>
            <Line data={data} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareFightersPage;
