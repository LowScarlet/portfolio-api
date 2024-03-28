const { Router } = require('express');

const { validationResult } = require('express-validator');
const ValidationException = require('../../../utils/exceptions/ValidationException');
const { db } = require('../../../utils/database');
const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const selectUserProfileField = require('./services/selectUserProfileField');
const CreateUserProfileValidator = require('./validators/CreateUserProfileValidator');
const ReadUserProfileValidator = require('./validators/ReadUserProfileValidator');
const WhereUserProfileValidator = require('./validators/WhereUserProfileValidator');
const UpdateUserProfileValidator = require('./validators/UpdateUserProfileValidator');

const modelDb = db.userProfile;

router.get('/', [
  PaginationValidator(),
  WhereUserProfileValidator(),
], async (req, res, next) => {
  let { skip, take } = req.query;
  const { fullName, bio } = req.query;
  skip = parseInt(skip, 10) || 0;
  take = parseInt(take, 10) || 10;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const userProfiles = await modelDb.findMany({
      where: {
        fullName: fullName ? {
          contains: fullName,
          mode: 'insensitive'
        } : undefined,
        bio: bio ? {
          contains: bio,
          mode: 'insensitive'
        } : undefined
      },
      select: selectUserProfileField(req.user),
      skip,
      take
    });

    res.json({
      message: req.t('validations.model.success-read-all-data'),
      data: {
        userProfiles,
        skip,
        take
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.post('/', [
  CreateUserProfileValidator()
], async (req, res, next) => {
  const { avatar, fullName, bio, UserId } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const userProfile = await modelDb.create({
      data: {
        avatar,
        fullName,
        bio,
        User: {
          connect: {
            id: UserId
          }
        }
      },
      select: selectUserProfileField(req.user),
    });

    res.json({
      message: req.t('validations.model.success-create-data'),
      data: {
        userProfile
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.get('/:userProfileId', [
  ReadUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const userProfile = await modelDb.findUnique({
      where: {
        id: userProfileId,
      },
      select: selectUserProfileField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-read-data'),
      data: {
        userProfile
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.put('/:userProfileId', [
  ReadUserProfileValidator(),
  UpdateUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  const { avatar, fullName, bio } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const userProfile = await modelDb.update({
      data: {
        avatar: avatar || undefined,
        fullName: fullName || undefined,
        bio: bio || undefined,
      },
      where: {
        id: userProfileId,
      },
      select: selectUserProfileField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-update-data'),
      data: {
        userProfile
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.delete('/:userProfileId', [
  ReadUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const userProfile = await modelDb.delete({
      where: {
        id: userProfileId,
      },
      select: selectUserProfileField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-delete-data'),
      data: {
        userProfile
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

module.exports = router;
