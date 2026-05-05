const express = require("express");
const userRoutes = require("./routes/userRoutes");
const Log = require("../logging_middleware/logger");

const app = express();
app.use(express.json());

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
  Log("backend", "info", "service", "Server started");
});