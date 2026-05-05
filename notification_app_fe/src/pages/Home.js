import React, { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";

function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container">
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>Loading...</p>
      ) : (
        notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))
      )}
    </div>
  );
}

export default Home;