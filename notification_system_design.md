# Stage 1: Notification System Design

##  Overview
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

##  Core Entity: Notification

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

### 1️ Get Notifications

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
2️ Mark Notification as Read

Endpoint

PATCH /notifications/:id/read

Headers

Authorization: Bearer <token>

Response

{
  "message": "Notification marked as read"
}
3️ Create Notification (Admin/System)

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
 Real-Time Notification Mechanism
 WebSockets (Recommended)
Persistent connection between client and server
Instant delivery of notifications
Suitable for large-scale systems
 Server-Sent Events (SSE)
One-way communication (server → client)
Simpler than WebSockets
 Polling
Client requests periodically
Less efficient (not recommended)
 Design Decisions
REST APIs for scalability and simplicity
JSON for lightweight communication
Token-based authentication for security
Pagination to handle large datasets
Filtering to improve performance

# Stage 2: Database Design

##  Database Choice

### Selected: NoSQL (MongoDB)

### Reason:
- Flexible schema (notification types vary)
- High scalability (50k+ users)
- Faster read/write operations
- Easy horizontal scaling (sharding)

---

##  Collection: notifications

### Schema

```json
{
  "_id": "ObjectId",
  "userId": "string",
  "type": "Placement | Event | Result",
  "message": "string",
  "isRead": false,
  "createdAt": "ISODate"
}
```

Indexing Strategy
1. Compound Index (Important)
db.notifications.createIndex({ userId: 1, isRead: 1, createdAt: -1 })

 Purpose:

Fast filtering (userId + unread)
Efficient sorting (latest first)


2. Type Filter Index
db.notifications.createIndex({ type: 1 })

 Purpose:

Fast filtering by notification type
🔍 Sample Queries
1. Get Unread Notifications
db.notifications.find({
  userId: "1042",
  isRead: false
}).sort({ createdAt: -1 }).limit(10)
2. Mark as Read
db.notifications.updateOne(
  { _id: ObjectId("123") },
  { $set: { isRead: true } }
)
3. Create Notification
db.notifications.insertOne({
  userId: "1042",
  type: "Placement",
  message: "Google hiring",
  isRead: false,
  createdAt: new Date()
})
 Potential Scaling Issues
Problem 1: Large Data Growth
Millions of notifications
Solution:
Archiving old notifications
TTL index for auto deletion
db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 })
Problem 2: High Read Load
Frequent API calls
Solution:
Redis caching
Pagination (limit + page)
Problem 3: Write Bottleneck
Bulk notifications
Solution:
Use message queue (Kafka / RabbitMQ)
Async processing
🚀 Scaling Strategy
Horizontal scaling using sharding (by userId)
Read replicas for high availability
Caching layer (Redis)
CDN for static content (if needed)
🧠 Final Justification

NoSQL is preferred because:

Schema flexibility
High throughput
Easy scaling
Better performance for real-time notification systems


# Stage 3: Query Optimization

##  Given Query

```sql
SELECT * FROM notifications 
WHERE studentID = 1042 AND isRead = false 
ORDER BY createdAt ASC;
```

Problems in the Query
No Index Usage
Query full table scan karegi
Performance slow ho jayega (especially large data me)
ORDER BY Issue
Sorting costly hai bina index ke
Time complexity increase hogi
ASC Order
Old notifications pehle aa rahi hain
User ko recent notifications chahiye hote hain

   Optimized Solution
1. Add Index
CREATE INDEX idx_notifications 
ON notifications (studentID, isRead, createdAt DESC);

 Benefits:

Fast filtering (studentID + isRead)
Sorting optimized (createdAt)
2. Optimized Query
SELECT * FROM notifications 
WHERE studentID = 1042 AND isRead = false 
ORDER BY createdAt DESC 
LIMIT 10;
 Improvements
DESC use kiya → latest notifications first
LIMIT add kiya → unnecessary data load avoid
Index use kiya → fast query execution



# Stage 4: Performance Optimization

##  Problem

Currently, every time a user opens the app, the system fetches notifications directly from the database.

 Issues:
- High database load
- Increased response time
- Poor scalability for large users

---

##  Why This is Bad

1. Repeated DB Calls  
- Same data baar-baar fetch ho raha hai  

2. Slow Response  
- Database query time high ho sakta hai  

3. Not Scalable  
- 50k users ke saath DB overload ho jayega  

---

##  Optimized Solution

### 1. Caching (Most Important)

- Use Redis (or in-memory cache)
- Store frequently accessed notifications

 Flow:
- First request → DB hit → cache me store  
- Next request → direct cache se data  

---

### 2. Pagination

- Limit results using `page` and `limit`

 Benefit:
- Large data ek baar me load nahi hota  
- Faster response  

---

### 3. Lazy Loading

- Initially only few notifications load karo  
- Scroll pe aur data fetch karo  

---

### 4. Reduce DB Hits

- Avoid unnecessary API calls  
- Use conditional fetching  

---

##  Final Approach

- Cache use karo (fast access)
- Pagination use karo (less data load)
- Lazy loading use karo (better UX)

---

##  Final Explanation

System optimized by:
- Reducing database calls
- Improving response time
- Making system scalable for large users
``` id="sl2ovw"
```
---


# Stage 5: Scalable Notification Delivery System

##  Problem

System needs to send notifications to 50,000 users at once.

 Issues:
- Sending one-by-one is slow
- High chance of failure
- Email service may crash
- Not scalable

---

##  Naive Approach (Wrong)

- Loop through all users
- Send notifications one-by-one

 Problems:
- Very slow
- Blocking system
- High failure rate

---

##  Optimized Scalable Solution

### 1. Use Queue System

- Use message queue (e.g., Kafka / RabbitMQ)

 Flow:
1. Notification request comes
2. Message pushed to queue
3. Workers process messages asynchronously

---

### 2. Asynchronous Processing

- Background workers handle notification sending
- Main server remains fast

---

### 3. Batch Processing

- Send notifications in batches (e.g., 1000 users at a time)

 Benefit:
- Reduces load
- Improves performance

---

### 4. Retry Mechanism

- If notification fails → retry automatically

 Prevents data loss

---

### 5. Rate Limiting

- Control number of requests per second

 Prevents system crash

---

##  Final Architecture

User → API → Queue → Worker → Notification Service

---

##  Final Explanation

System is scalable because:
- Uses asynchronous processing
- Avoids blocking operations
- Handles failures using retry logic
- Efficiently manages large user load
``` id="95njzk"

---

```

