const { attemptRequest } = require('../services/rateLimit.service');

const { getAllStats } = require('../store/rateLimit.store');

function handleRequest(req, res) {
  const { user_id, payload } = req.body;

  if (!user_id || typeof user_id !== 'string') {
    return res.status(400).json({
      error: 'user_id is required and must be a non-empty string',
    });
  }

  if (!user_id.trim()) {
    return res.status(400).json({
      error: 'user_id cannot be empty',
    });
  }

  if (!Object.prototype.hasOwnProperty.call(req.body, 'payload')) {
    return res.status(400).json({
      error: 'payload field is required',
    });
  }

  const result = attemptRequest(user_id);

  if (!result.allowed) {
    return res.status(429).json({
      error: result.message,
    });
  }

  return res.status(201).json({
    message: result.message,
    data: {
      user_id,
      payload,
    },
  });
}

function getStats(req, res) {
  return res.status(200).json({
    stats: getAllStats(),
  });
}

module.exports = {
  handleRequest,
  getStats,
};