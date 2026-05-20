const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/errorHandler');

function buildApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'API running',
    });
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}

module.exports = {
  buildApp,
};