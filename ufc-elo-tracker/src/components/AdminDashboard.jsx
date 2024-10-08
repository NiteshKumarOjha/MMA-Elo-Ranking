// AdminDashboard.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>
      <nav className="bg-gray-700 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="matches" className="hover:text-gray-300">
              Match Management
            </Link>
          </li>
          <li>
            <Link to="fighters" className="hover:text-gray-300">
              Fighter Management
            </Link>
          </li>
          {/* Add more links for additional admin functionalities here */}
        </ul>
      </nav>
      <main className="flex-1 p-4">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminDashboard;
