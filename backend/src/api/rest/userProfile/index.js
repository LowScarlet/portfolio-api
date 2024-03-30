const { Router } = require('express');

const { validationResult } = require('express-validator');
const ValidationException = require('../../../utils/exceptions/ValidationException');
const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const { isAdministrator } = require('../user/middlewares/Middlewares');
const { WhereUserProfilesValidator, CreateUserProfileValidator, ReadUserProfileValidator, UpdateUserProfileValidator, DeleteUserProfileValidator } = require('./validators/Validators');
const UserProfileHandler = require('./Handler');

router.use((req, res, next) => {
  req.handler = new UserProfileHandler(req.user);
  next();
});

router.post('/', [
  isAdministrator,
  CreateUserProfileValidator()
], async (req, res, next) => {
  const { avatar, fullName, bio, userId } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const userProfile = await handler.create({
      avatar,
      fullName,
      bio,
      userId
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

router.get('/', [
  PaginationValidator(),
  WhereUserProfilesValidator(),
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

    const { handler } = req;

    const userProfiles = await handler.readAll({
      fullName,
      bio
    }, skip, take);

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

router.get('/:userProfileId', [
  ReadUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const userProfile = await handler.read({
      id: userProfileId
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
  isAdministrator,
  ReadUserProfileValidator(),
  UpdateUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  const { avatar, fullName, bio, userId } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const userProfile = await handler.update({
      id: userProfileId,
      avatar,
      fullName,
      bio,
      userId
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
  isAdministrator,
  ReadUserProfileValidator(),
  DeleteUserProfileValidator()
], async (req, res, next) => {
  const { userProfileId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const userProfile = await handler.delete({
      id: userProfileId
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
