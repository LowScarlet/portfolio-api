/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');
const express = require('express');

const router = express.Router();

const auth = require('./auth');
const rest = require('./rest');

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

router.use('/auth', [limiter], auth);
router.use('/rest', rest);

module.exports = router;
