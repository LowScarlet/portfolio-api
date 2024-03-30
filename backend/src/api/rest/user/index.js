const { Router } = require('express');

const { validationResult } = require('express-validator');
const ValidationException = require('../../../utils/exceptions/ValidationException');
const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const { isAdministrator } = require('./middlewares/Middlewares');
const { WhereUsersValidator, CreateUserValidator, ReadUserValidator, UpdateUserValidator, DeleteUserValidator } = require('./validators/Validators');
const UserHandler = require('./Handler');

router.use((req, res, next) => {
  req.handler = new UserHandler(req.user);
  next();
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

    const { handler } = req;

    const user = await handler.create({
      username,
      email,
      password,
      role,
      isActive
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

    const { handler } = req;

    const users = await handler.readAll({
      username,
      email,
      role,
      isActive
    }, skip, take);

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

router.get('/:userId', [
  ReadUserValidator()
], async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const user = await handler.read({
      id: userId
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

    const { handler } = req;

    const user = await handler.update({
      id: userId,
      username,
      email,
      password,
      role,
      isActive
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
  ReadUserValidator(),
  DeleteUserValidator()
], async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const { handler } = req;

    const user = await handler.delete({
      id: userId
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
