const axios = require("axios");
require("dotenv").config();

const LOG_API = process.env.BASE_URL + process.env.LOG_API;

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log sent:", response.data);
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
}

module.exports = Log;