const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');

// i18next Middlewares
const i18next = require('i18next');
const i18nextBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
// The App
const app = express();

// Import Routes
const api = require('./api/Routes');

// Custom Middlewares
const Error = require('./utils/middlewares/Error');
const NotFound = require('./utils/NotFound');
const { CheckPayload } = require('./api/auth/Middlewares');
const { handleCors } = require('./utils/middlewares/Cors');

// Use .env
require('dotenv').config();

// i18next Setup
i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en_US',
    backend: {
      loadPath: path.join(__dirname, '..', 'public/locales/{{lng}}/translation.json')
    }
  });
app.use(i18nextMiddleware.handle(i18next));

// Favicon
app.use(favicon(path.join(__dirname, '..', 'public/favicon.ico')));

// Public Routes
app.get('/public', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.json({
    message: req.t('welcome-messages.public')
  });
});

app.get('/public/:path*', (req, res) => {
  const fullPath = req.params.path + req.params[0];
  if (process.env.NODE_ENV === 'production' && req.params.path.startsWith('uploads')) {
    res.redirect(`${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_STORAGE_BUCKET}/${fullPath}`);
  } else {
    res.sendFile(path.join(__dirname, `../public/${fullPath}`));
  }
});

// Default Configuration
app.set('json spaces', 2);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Index Routes
app.use('/', CheckPayload);

app.get('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.json({
    message: req.t('welcome-messages.home')
  });
});

// Routes Setup
app.use('/api', cors(handleCors), api);

// Custom Middlewares Setup
app.use(NotFound);
app.use(Error);

// Module Exports
module.exports = app;
