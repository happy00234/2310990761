# Stage 1: Notification System Design

## 📌 Overview
This system is designed to manage student notifications for:
- Placements
- Events
- Results

### Features:
- Real-time notifications
- Read/Unread tracking
- Filtering by notification type
- Scalable for large number of users

---

## 🧩 Core Entity: Notification

| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | string    | Unique notification ID |
| userId     | string    | Student ID |
| type       | string    | Placement / Event / Result |
| message    | string    | Notification content |
| isRead     | boolean   | Read status |
| createdAt  | datetime  | Timestamp |

---

## 🔗 API Design

## 🔗 API Design

### 1️⃣ Get Notifications

**Endpoint**
```http
GET /notifications
```

Query Parameters

page (number)
limit (number)
notification_type (optional)

Headers

Authorization: Bearer <token>

Response

{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Google hiring",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:18"
    }
  ]
}
2️⃣ Mark Notification as Read

Endpoint

PATCH /notifications/:id/read

Headers

Authorization: Bearer <token>

Response

{
  "message": "Notification marked as read"
}
3️⃣ Create Notification (Admin/System)

Endpoint

POST /notifications

Headers

Authorization: Bearer <token>

Request Body

{
  "userId": "123",
  "type": "Placement",
  "message": "Amazon hiring"
}

Response

{
  "message": "Notification created successfully"
}
⚡ Real-Time Notification Mechanism
🔹 WebSockets (Recommended)
Persistent connection between client and server
Instant delivery of notifications
Suitable for large-scale systems
🔹 Server-Sent Events (SSE)
One-way communication (server → client)
Simpler than WebSockets
🔹 Polling
Client requests periodically
Less efficient (not recommended)
📊 Design Decisions
REST APIs for scalability and simplicity
JSON for lightweight communication
Token-based authentication for security
Pagination to handle large datasets
Filtering to improve performance