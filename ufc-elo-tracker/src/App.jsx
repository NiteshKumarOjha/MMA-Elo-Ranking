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
import TopFightersByEloSum from "./pages/Last5";
import InactivePage from "./pages/InactiveRanking";
import AllRanks from "./pages/AllRanking";
import TopFightersByEloSumFirst from "./pages/FirstFive";
import AvgEloRanks from "./pages/AvgElo";

function App() {
  // Access the environment variable using import.meta.env
  const adminSafe = import.meta.env.VITE_ADMIN;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inactive" element={<InactivePage />} />
        <Route path="/allfighters" element={<AllRanks />} />
        <Route path="/rankings" element={<AvgEloRanks />} />
        <Route path="/database" element={<FighterPage />} />
        <Route path="/compare" element={<CompareFightersPage />} />
        <Route path="/database/:fighterId" element={<FighterDetailsPage />} />
        <Route path="/lastfive" element={<TopFightersByEloSum />} />
        <Route path="/firstfive" element={<TopFightersByEloSumFirst />} />
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
