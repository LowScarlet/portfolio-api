const { Router } = require('express');

const { validationResult } = require('express-validator');
const ValidationException = require('../../../utils/exceptions/ValidationException');
const { db } = require('../../../utils/database');
const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const selectUserField = require('./services/selectUserField');
const CreateUserValidator = require('./validators/CreateUserValidator');
const ReadUserValidator = require('./validators/ReadUserValidator');
const WhereUsersValidator = require('./validators/WhereUsersValidator');
const stringToBoolean = require('../../../utils/stringToBoolean');
const UpdateUserValidator = require('./validators/UpdateUserValidator');
const isAdministrator = require('./middlewares/isAdministrator');

const modelDb = db.user;

router.get('/', [
  PaginationValidator(),
  WhereUsersValidator(),
], async (req, res, next) => {
  let { skip, take } = req.query;
  const { username, email, role, isActive } = req.query;
  skip = parseInt(skip, 10) || 0;
  take = parseInt(take, 10) || 10;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const users = await modelDb.findMany({
      where: {
        username: username ? {
          contains: username
        } : undefined,
        email: email ? {
          contains: email
        } : email,
        role: role || undefined,
        isActive: stringToBoolean(isActive) || undefined
      },
      select: selectUserField(req.user),
      skip,
      take
    });

    res.json({
      message: req.t('validations.model.success-read-all-data'),
      data: {
        users,
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
  isAdministrator,
  CreateUserValidator()
], async (req, res, next) => {
  const { username, email, password, role, isActive } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const user = await modelDb.create({
      data: {
        username,
        email,
        password,
        role,
        isActive: stringToBoolean(isActive) || undefined
      },
      select: selectUserField(req.user),
    });

    res.json({
      message: req.t('validations.model.success-create-data'),
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.get('/:userId', [
  ReadUserValidator()
], async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const user = await modelDb.findUnique({
      where: {
        id: userId,
      },
      select: selectUserField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-read-data'),
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.put('/:userId', [
  isAdministrator,
  ReadUserValidator(),
  UpdateUserValidator()
], async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, role, isActive } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const user = await modelDb.update({
      data: {
        username: username || undefined,
        email: email || undefined,
        password: password || undefined,
        role: role || undefined,
        isActive: stringToBoolean(isActive) || undefined
      },
      where: {
        id: userId,
      },
      select: selectUserField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-update-data'),
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

router.delete('/:userId', [
  isAdministrator,
  ReadUserValidator()
], async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const user = await modelDb.delete({
      where: {
        id: userId,
      },
      select: selectUserField(req.user)
    });

    res.json({
      message: req.t('validations.model.success-delete-data'),
      data: {
        user
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

module.exports = router;
