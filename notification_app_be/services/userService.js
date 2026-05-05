const Log = require("../../logging_middleware/logger");

const fetchUser = async () => {
  try {
    Log("backend", "info", "service", "Inside service");

    return { name: "Happy", role: "Developer" };
  } catch (error) {
    Log("backend", "error", "service", error.message);
    throw error;
  }
};

module.exports = { fetchUser };