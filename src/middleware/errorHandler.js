function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Route not found',
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};