const { Router } = require('express');
const { db } = require('../../../../utils/database');
const { UpdateValidator } = require('./Validators');
const { viewField } = require('../../../rest/userProfile/Services');
const ImageUploads = require('../../../../utils/middlewares/ImageUploads');

const router = Router();

router.get('/', [
  // DefaultReadRateLimit
], async (req, res, next) => {
  try {
    const { user } = req;

    const userProfile = await db.userProfile.findUnique({
      where: { userId: user.id }
    });

    res.json({
      userProfile,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', [
  UpdateValidator(),
  ImageUploads({
    avatar: {
      dir: '/avatars',
      resize: { width: 300 }
    }
  })
], async (req, res, next) => {
  try {
    const { user, scarlet } = req;
    const { body } = scarlet;

    const userProfile = await db.userProfile.update({
      select: viewField(user),
      where: { userId: user.id },
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
