const { Router } = require('express');
const { db } = require('../../../../utils/database');
const { viewField } = require('../../../rest/portfolio/Services');
const { CreateValidator } = require('./Validators');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { user: client } = req;

    const selectFields = viewField(client);
    const portfolios = await db.portfolio.findMany({
      where: {
        OR: [
          { ownerId: client.id },
          { PortfolioContributor: { some: { userId: client.id } } }
        ]
      },
      ...(selectFields ? {
        select: {
          ...selectFields,
          PortfolioProfile: true,
          PortfolioContributor: true
        }
      } : {
        include: {
          PortfolioProfile: true,
          PortfolioContributor: true
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

// Create Portfolio
router.post('/', [
  CreateValidator()
], async (req, res, next) => {
  try {
    const { user: client, scarlet } = req;
    const { body } = scarlet;

    const selectFields = viewField(client);
    const portfolio = await db.portfolio.create({
      data: {
        ...body,
        ownerId: client.id,
        PortfolioProfile: { create: {} }
      },
      ...(selectFields ? {
        select: {
          ...selectFields,
          PortfolioProfile: true,
          PortfolioContributor: true
        }
      } : {
        include: {
          PortfolioProfile: true,
          PortfolioContributor: true
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

module.exports = router;
