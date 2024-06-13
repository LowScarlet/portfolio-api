const { Router } = require('express');
const { db } = require('../../../utils/database');
const { viewField } = require('../../rest/user/Services');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { user: client } = req;

    const selectFields = viewField(client);
    const user = await db.user.findUnique({
      where: { id: client.id },
      ...(selectFields ? {
        select: {
          ...selectFields,
          UserProfile: true
        }
      } : {
        include: {
          UserProfile: true
        }
      })
    });

    res.json({
      user,
    });
  } catch (err) {
    next(err);
  }
});

router.use('/profile', require('./profile/Routes'));
router.use('/portfolios', require('./portfolios/Routes'));

module.exports = router;
