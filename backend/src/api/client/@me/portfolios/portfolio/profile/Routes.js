const { Router } = require('express');
const { viewField } = require('../../../../../rest/portfolioProfile/Services');
const { db } = require('../../../../../../utils/database');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { scarlet, user: client } = req;
    const { id } = scarlet.params;

    const selectFields = viewField(client);
    const portfolioProfile = await db.portfolioProfile.findUnique({
      where: { porfolioId: id },
      select: selectFields
    });

    res.json({
      portfolioProfile,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
