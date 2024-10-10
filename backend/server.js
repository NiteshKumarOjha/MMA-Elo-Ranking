const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(cors());
// Body parser middleware to parse JSON
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

const recalculateElo = require("./routes/reCalculateElo");
app.use("/api", recalculateElo);

// Define API routes
const fighterRoutes = require("./routes/fighterRoutes");
app.use("/api/fighters", fighterRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const matchRoutes = require("./routes/matchRoutes"); // Uncomment this line
app.use("/api/matches", matchRoutes); // Ensure this route is active

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
