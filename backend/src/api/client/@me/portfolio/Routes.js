const { Router } = require('express');
const { db } = require('../../../../utils/database');

const router = Router();

router.get('/', [
  // DefaultReadRateLimit
], async (req, res, next) => {
  try {
    const { user } = req;

    const portfolio = await db.portfolio.findMany({
      where: { ownerId: user.id }
    });

    res.json({
      portfolio,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
