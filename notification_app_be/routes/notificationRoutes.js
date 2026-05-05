const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const notifications = [
    {
      id: 1,
      type: "Placement",
      message: "Google hiring",
      isRead: false,
      createdAt: "2026-05-04",
    },
    {
      id: 2,
      type: "Result",
      message: "Exam result declared",
      isRead: true,
      createdAt: "2026-05-03",
    },
    {
      id: 3,
      type: "Event",
      message: "Hackathon coming",
      isRead: false,
      createdAt: "2026-05-02",
    },
  ];

  res.json({ notifications });
});

module.exports = router;