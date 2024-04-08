/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');
const express = require('express');

const router = express.Router();

const auth = require('./auth');
const rest = require('./rest');
const isAuthenticated = require('./auth/model/middlewares/isAuthenticated');

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
], auth);

router.use('/rest', [
  // isAuthenticated
], rest);

module.exports = router;
