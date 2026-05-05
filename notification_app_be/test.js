const Log = require("../logging_middleware/logger");

Log("backend", "info", "route", "Test log working");
Log("backend", "error", "db", "Database failed");