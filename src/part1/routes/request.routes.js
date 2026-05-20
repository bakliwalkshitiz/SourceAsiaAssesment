const express = require('express');

const {
  handleRequest,
  getStats,
} = require('../controllers/request.controller');

const router = express.Router();

router.post('/request', handleRequest);

router.get('/stats', getStats);

module.exports = router;