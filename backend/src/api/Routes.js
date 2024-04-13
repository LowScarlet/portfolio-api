/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');
const express = require('express');
const { IsAuthenticated } = require('./auth/Middlewares');

const router = express.Router();

// Still Testing (really need this?)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.json({
      message: req.t('utils.middlewares.rate-limit')
    });
  }
});

// Initial Custom Request :<
router.use((req, res, next) => {
  req.scarlet = {
    param: {},
    query: {},
    body: {},
    pagination: { skip: 0, take: 10 }
  };
  next();
});

router.use('/auth', [
  limiter
], require('./auth/Routes'));

router.use('/rest', [
  IsAuthenticated
], require('./rest/Routes'));

module.exports = router;
