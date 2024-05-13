const { Router } = require('express');
const { DefaultReadRateLimit } = require('../../../utils/middlewares/RateLimit');

const router = Router();

router.get('/', [
  // DefaultReadRateLimit
], async (req, res, next) => {
  try {
    const { user } = req;

    res.json({
      user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
