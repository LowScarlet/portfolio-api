/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');

const someOptions = {
  standardHeaders: true,
  legacyHeaders: false,
};

const DefaultReadRateLimit = rateLimit({
  ...someOptions,
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100,
  handler: (req, res, next, options) => {
    res.json({
      message: req.t('utils.middlewares.rate-limit')
    });
  },
  keyGenerator(req) {
    const { user } = req;
    return user.id;
  }
});

const DefaultModifyRateLimit = rateLimit({
  ...someOptions,
  windowMs: 0.5 * 60 * 1000, // 30 seconds
  max: 30,
  handler: (req, res, next, options) => {
    res.json({
      message: req.t('utils.middlewares.rate-limit')
    });
  },
  keyGenerator(req) {
    const { user } = req;
    return user.id;
  }
});

module.exports = {
  DefaultReadRateLimit,
  DefaultModifyRateLimit
};
