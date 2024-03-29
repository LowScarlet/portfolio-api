const { Router } = require('express');

const { validationResult } = require('express-validator');
const ValidationException = require('../../../utils/exceptions/ValidationException');
require('../../../utils/database');
const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const CreateUserValidator = require('./validators/CreateUserValidator');
const ReadUserValidator = require('./validators/ReadUserValidator');
const WhereUsersValidator = require('./validators/WhereUsersValidator');
const UpdateUserValidator = require('./validators/UpdateUserValidator');
const isAdministrator = require('./middlewares/isAdministrator');
const readAllUser = require('./services/readAllUser');
const createUser = require('./services/createUser');
const readUser = require('./services/readUser');
const updateUser = require('./services/updateUser');
const deleteUser = require('./services/deleteUser');

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

    const users = readAllUser(
      req.user,
      {
        username,
        email,
        role,
        isActive
      },
      skip,
      take
    );

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

    const user = createUser(
      req.user,
      {
        username,
        email,
        password,
        role,
        isActive
      }
    );

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

    const user = readUser(
      req.user,
      {
        id: userId
      }
    );

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

    const user = updateUser(
      req.user,
      {
        id: userId,
        username,
        email,
        password,
        role,
        isActive
      }
    );

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

    const user = deleteUser(
      req.user,
      {
        id: userId
      }
    );

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
