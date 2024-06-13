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
    const portfolios = await db.portfolio.findMany({
      where: { ownerId: client.id },
      ...(selectFields ? {
        select: {
          ...selectFields,
          PortfolioProfile: true
        }
      } : {
        include: {
          PortfolioProfile: true
        }
      })
    });

    res.json({
      portfolios,
    });
  } catch (err) {
    next(err);
  }
});

router.use('/:id', [
  ReadValidator()
], require('./portfolio/Routes'));

module.exports = router;
