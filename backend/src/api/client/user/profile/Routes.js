const { Router } = require('express');
const { db } = require('../../../../utils/database');
const { UpdateValidator } = require('./Validators');
const { viewField } = require('../../../rest/userProfile/Services');

const router = Router();

router.get('/', [
  //
], async (req, res, next) => {
  try {
    const { user: client } = req;

    const selectFields = viewField(client);
    const userProfile = await db.userProfile.findUnique({
      select: selectFields,
      where: { userId: client.id }
    });

    res.json({
      userProfile,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', [
  UpdateValidator()
], async (req, res, next) => {
  try {
    const { user: client, scarlet } = req;
    const { body } = scarlet;

    const selectFields = viewField(client);
    const userProfile = await db.userProfile.update({
      select: selectFields,
      where: { userId: client.id },
      data: body
    });

    res.json({
      userProfile,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
