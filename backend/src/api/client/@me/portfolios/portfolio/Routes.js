const { Router } = require('express');
const { viewField } = require('../../../../rest/portfolio/Services');
const { db } = require('../../../../../utils/database');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { scarlet, user: client } = req;
    const { id } = scarlet.params;

    const selectFields = viewField(client);
    const portfolio = await db.portfolio.findUnique({
      where: { ownerId: client.id, id },
      ...(selectFields ? {
        select: {
          ...selectFields,
          PorfolioProfile: true
        }
      } : {
        include: {
          PorfolioProfile: true
        }
      })
    });

    res.json({
      portfolio,
    });
  } catch (err) {
    next(err);
  }
});

router.use('/profile', require('./profile/Routes'));

module.exports = router;
