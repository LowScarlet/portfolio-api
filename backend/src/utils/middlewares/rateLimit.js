/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');

const rateLimitByRole = rateLimit({
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

module.exports = {
  rateLimitByRole
};
