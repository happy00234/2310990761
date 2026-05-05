const getTopNotifications = require("./utils/priority");

const notifications = [
  { id: 1, type: "Event", createdAt: "2026-05-01" },
  { id: 2, type: "Placement", createdAt: "2026-05-03" },
  { id: 3, type: "Result", createdAt: "2026-05-02" },
  { id: 4, type: "Placement", createdAt: "2026-05-04" }
];

const result = getTopNotifications(notifications, 2);
console.log(result);