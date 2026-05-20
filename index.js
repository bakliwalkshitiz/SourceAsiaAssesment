const http = require('http');
const { buildApp } = require('./src/app');

const PORT = process.env.PORT || 3000;

const app = buildApp();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));