import React from "react";
import NotificationCard from "../components/NotificationCard";

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

function Home() {
  return (
    <div className="container">
      <h1>Notifications</h1>

      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}

export default Home;