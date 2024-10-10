import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger icons
import { MdKeyboardArrowDown } from "react-icons/md"; // Dropdown icon

const colorPairs = [{ bg: "#111", text: "#ffffff" }];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [bgColor, setBgColor] = useState("#111");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const navLinks = [
    { to: "/", label: "Live Ratings" },
    { to: "/rankings", label: "Rankings" },
    { to: "/lastfive", label: "Last 5 Match" },
    { to: "/title", label: "Title Fights" },
    { to: "/women", label: "Women" },
    { to: "/database", label: "Database" },
    { to: "/compare", label: "Compare Fighters" },
  ];

  const dropdownLinks = [
    { to: "/allfighters", label: "All Fighters" },
    { to: "/firstfive", label: "First 5 Match" },
    { to: "/inactive", label: "Inactive" },
  ];

  return (
    <nav
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: "background-color 0.5s, color 0.5s",
      }}
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
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={toggleMenu}
                  className={`text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                    location.pathname === link.to
                      ? "text-orange-500 font-bold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Dropdown Links in Mobile View */}
            {dropdownLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={toggleMenu}
                  className={`text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                    location.pathname === link.to
                      ? "text-orange-500 font-bold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-800">
        <ul className="flex text-[1.2rem] justify-center space-x-10 p-4 border-t border-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                  location.pathname === link.to
                    ? "text-orange-500 font-bold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Dropdown Example */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-300 hover:text-orange-500 transition duration-300"
            >
              More{" "}
              <MdKeyboardArrowDown
                className={`ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <ul
                className="absolute left-0 mt-2 bg-gray-700 rounded-md shadow-lg"
                style={{ width: "200px" }} // Make dropdown wider
              >
                {dropdownLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block px-4 py-2 text-gray-300 hover:text-orange-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
