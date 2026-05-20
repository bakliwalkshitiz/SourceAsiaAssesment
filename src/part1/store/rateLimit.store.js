const requestLog = new Map();

const stats = new Map();

function getUserRequests(userId) {
  return requestLog.get(userId) || [];
}

function setUserRequests(userId, timestamps) {
  requestLog.set(userId, timestamps);
}

function getUserStats(userId) {
  return (
    stats.get(userId) || {
      accepted: 0,
      rejected: 0,
    }
  );
}

function incrementAccepted(userId) {
  const current = getUserStats(userId);

  current.accepted += 1;

  stats.set(userId, current);
}

function incrementRejected(userId) {
  const current = getUserStats(userId);

  current.rejected += 1;

  stats.set(userId, current);
}

function getAllStats() {
  return Object.fromEntries(stats);
}

module.exports = {
  getUserRequests,
  setUserRequests,
  incrementAccepted,
  incrementRejected,
  getAllStats,
};