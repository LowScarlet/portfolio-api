const { Router } = require('express');

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

router.use('/profile', require('./profile/Routes'));

module.exports = router;
