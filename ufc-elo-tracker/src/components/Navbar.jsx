import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger icons

const colorPairs = [
  { bg: "#111", text: "#ffffff" },
  // { bg: "#003366", text: "#ffffff" },
  // { bg: "#660000", text: "#ffffff" },
  // { bg: "#4d4d00", text: "#ffffff" },
  // { bg: "#4d004d", text: "#ffffff" },
  // { bg: "#ffcc00", text: "#000000" },
  // { bg: "#cc3300", text: "#ffffff" },
  // { bg: "#006600", text: "#ffffff" },
  // { bg: "#006699", text: "#ffffff" },
  // { bg: "#ff9900", text: "#000000" },
  // { bg: "#666666", text: "#ffffff" },
  // { bg: "#c2c2f0", text: "#000000" },
  // { bg: "#ff3399", text: "#000000" },
  // { bg: "#3399ff", text: "#000000" },
  // { bg: "#cc0000", text: "#ffffff" },
  // { bg: "#ffcc99", text: "#000000" },
  // { bg: "#006600", text: "#ffffff" },
  // { bg: "#990033", text: "#ffffff" },
  // { bg: "#b3b3b3", text: "#000000" },
  // { bg: "#ffccff", text: "#000000" },
  // { bg: "#336600", text: "#ffffff" },
  // { bg: "#660066", text: "#ffffff" },
  // { bg: "#003300", text: "#ffffff" },
  // { bg: "#800000", text: "#ffffff" },
  // { bg: "#b3e6b3", text: "#000000" },
  // { bg: "#cccc00", text: "#000000" },
  // { bg: "#800080", text: "#ffffff" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [bgColor, setBgColor] = useState("#111");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    const { text, bg } = colorPairs[randomIndex];

    setTextColor(text);
    setBgColor(bg);

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colorPairs.length);
      const { text, bg } = colorPairs[randomIndex];

      setTextColor(text);
      setBgColor(bg);
    }, 10000); // Change colors every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []); // Empty dependency array to run only once on mount

  return (
    <nav
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: "background-color 0.5s, color 0.5s",
      }} // Smooth transition for colors
      className="shadow-lg"
    >
      {/* Header */}
      <header className="p-6">
        <h1 className="text-4xl font-bold text-center">LIVE MMA ELO RATINGS</h1>
        <p className="text-center mt-2 text-gray-400">
          Last update: {new Date().toLocaleString()}
        </p>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800">
        <div className="flex justify-end items-center p-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Menu Items */}
        {isOpen && (
          <ul className="flex flex-col items-center space-y-4 p-4 border-t border-gray-700 animate-slide-down">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Live Ratings
              </Link>
            </li>
            <li>
              <Link
                to="/allfighters"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                All Fighters
              </Link>
            </li>
            <li>
              <Link
                to="/lastfive"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Last 5 Match
              </Link>
            </li>
            <li>
              <Link
                to="/firstfive"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                First 5 Match
              </Link>
            </li>
            <li>
              <Link
                to="/inactive"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Inactive
              </Link>
            </li>

            <li>
              <Link
                to="/women"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/database"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Database
              </Link>
            </li>

            <li>
              <Link
                to="/compare"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Compare Fighters
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-800">
        <ul className="flex text-lg justify-center space-x-12 p-4 border-t border-gray-700 animate-fade-in">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Live Ratings
            </Link>
          </li>

          <li>
            <Link
              to="/allfighters"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              All Fighters
            </Link>
          </li>
          <li>
            <Link
              to="/lastfive"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Last 5 Match
            </Link>
          </li>
          <li>
            <Link
              to="/firstfive"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              First 5 Match
            </Link>
          </li>
          <li>
            <Link
              to="/inactive"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Inactive
            </Link>
          </li>

          <li>
            <Link
              to="/women"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to="/database"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Database
            </Link>
          </li>
          <li>
            <Link
              to="/compare"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Compare Fighters
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
