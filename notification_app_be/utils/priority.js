// Priority mapping
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getTopNotifications(notifications, N) {
  // Sort by priority first, then by latest time
  const sorted = notifications.sort((a, b) => {
    if (priorityMap[b.type] !== priorityMap[a.type]) {
      return priorityMap[b.type] - priorityMap[a.type];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return sorted.slice(0, N);
}

module.exports = getTopNotifications;