import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing hamburger icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#111] text-white shadow-lg">
      {/* Header */}
      <header className="p-6">
        <h1 className="text-4xl font-bold text-center animate-pulse">
          LIVE MMA ELO RATINGS
        </h1>
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
                to="/faq"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                FAQ
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
        <ul className="flex justify-center space-x-8 p-4 border-t border-gray-700 animate-fade-in">
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
              to="/faq"
              className="text-gray-300 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              FAQ
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
