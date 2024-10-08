// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import FighterPage from "./pages/FighterListPage";
import FighterDetailsPage from "./pages/FighterDetailsPage";
import AdminDashboard from "./components/AdminDashboard";
import MatchManagement from "./components/MatchManagement";
import FighterManagement from "./components/FighterManagement";
import CompareFightersPage from "./pages/CompareFightersPage";

function App() {
  // Access the environment variable using import.meta.env
  const adminSafe = import.meta.env.VITE_ADMIN;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/database" element={<FighterPage />} />
        <Route path="/compare" element={<CompareFightersPage />} />
        <Route path="/database/:fighterId" element={<FighterDetailsPage />} />
        <Route path={`/${adminSafe}`} element={<AdminDashboard />}>
          <Route path="matches" element={<MatchManagement />} />
          <Route path="fighters" element={<FighterManagement />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
