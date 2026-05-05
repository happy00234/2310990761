const Log = require("../../logging_middleware/logger");
const { fetchUser } = require("../services/userService");

const getUser = async (req, res) => {
  try {
    Log("backend", "info", "controller", "Fetching user");

    const data = await fetchUser();

    res.json(data);
  } catch (error) {
    Log("backend", "error", "controller", error.message);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { getUser };