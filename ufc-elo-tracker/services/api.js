// src/services/api.js
import axios from "axios";

// Get all fighters
export const getFighters = () => axios.get("/api/fighters");

// Get details of a single fighter
export const getFighterDetails = (id) => axios.get(`/api/fighters/${id}`);

export const getFightersSortedByElo = () =>
  axios.get("/api/fighters/sortedByElo");

// Admin: Add match results
export const addMatchResult = (matchData) =>
  axios.post("/api/admin/addMatch", matchData);
