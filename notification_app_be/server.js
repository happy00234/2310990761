const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const Log = require("../logging_middleware/logger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/notifications", notificationRoutes);

// Root route (optional but useful)
app.get("/", (req, res) => {
  Log("backend", "info", "route", "Root route hit");
  res.send("Backend running");
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  Log("backend", "info", "service", "Server started");
});