const { Router } = require('express');

const router = Router();

router.get('/', [
  //
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
