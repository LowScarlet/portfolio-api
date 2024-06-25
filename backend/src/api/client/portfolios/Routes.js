const { Router } = require('express');
const { db } = require('../../../utils/database');
const { viewField } = require('../../rest/portfolio/Services');
const { ReadValidator } = require('./Validators');

const router = Router();

router.get('/', [
  ReadValidator()
], async (req, res, next) => {
  try {
    const { user: client, scarlet } = req;
    const { query } = scarlet;
    const { id: portfolioId } = query;

    const selectFields = viewField(client);
    if (portfolioId) {
      const portfolio = await db.portfolio.findUnique({
        where: {
          id: portfolioId,
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
      return;
    }
    const portfolios = await db.portfolio.findMany({
      where: { },
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
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = router;
