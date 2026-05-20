const {
  getUserRequests,
  setUserRequests,
  incrementAccepted,
  incrementRejected,
} = require('../store/rateLimit.store');

const WINDOW_SIZE = 60 * 1000;

const MAX_REQUESTS = 5;

function attemptRequest(userId) {
  const now = Date.now();

  const windowStart = now - WINDOW_SIZE;

  const timestamps = getUserRequests(userId);

  const validRequests = timestamps.filter(
    (timestamp) => timestamp >= windowStart
  );

  if (validRequests.length >= MAX_REQUESTS) {
    incrementRejected(userId);

    setUserRequests(userId, validRequests);

    return {
      allowed: false,
      message: 'Rate limit exceeded. Try again later.',
    };
  }

  validRequests.push(now);

  setUserRequests(userId, validRequests);

  incrementAccepted(userId);

  return {
    allowed: true,
    message: 'Request accepted',
  };
}

module.exports = {
  attemptRequest,
};