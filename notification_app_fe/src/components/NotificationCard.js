import React from "react";

const getPriorityColor = (type) => {
  if (type === "Placement") return "red";
  if (type === "Result") return "orange";
  return "green";
};

function NotificationCard({ notification }) {
  return (
    <div className="card">
      <h3 style={{ color: getPriorityColor(notification.type) }}>
        {notification.type}
      </h3>

      <p>{notification.message}</p>

      <small>{notification.createdAt}</small>

      <div>
        Status:{" "}
        <span className={notification.isRead ? "read" : "unread"}>
          {notification.isRead ? "Read" : "Unread"}
        </span>
      </div>
    </div>
  );
}

export default NotificationCard;