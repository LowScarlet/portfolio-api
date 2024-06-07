const { Router } = require('express');
const { db } = require('../../../../utils/database');
const { ReadValidator } = require('../../../rest/portfolio/Validators');
const { viewField } = require('../../../rest/portfolio/Services');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { user: client } = req;

    const selectFields = viewField(client);
    const portfolio = await db.portfolio.findMany({
      where: { ownerId: client.id },
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

router.use('/:id', [
  ReadValidator()
], require('./portfolio/Routes'));

module.exports = router;
