const { Router } = require('express');

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
  const { handler, scarlet } = req;
  const { body } = scarlet;

  const data = await handler.create(body);

  res.json({
    message: req.t('validations.model.success-create-data'),
    data
  });

  next();
});

router.get('/', [
  PaginationValidator(),
  WhereUsersValidator(),
], async (req, res, next) => {
  const { handler, scarlet } = req;
  const { query } = scarlet;
  const { skip, take } = scarlet.pagination;

  const data = await handler.reads(query, skip, take);

  res.json({
    message: req.t('validations.model.success-read-all-data'),
    data,
    skip,
    take
  });

  next();
});

router.get('/:id', [
  ReadUserValidator()
], async (req, res, next) => {
  const { handler, scarlet } = req;
  const { id } = scarlet.param;

  const data = await handler.read(id);

  res.json({
    message: req.t('validations.model.success-read-data'),
    data
  });

  next();
});

router.put('/:id', [
  isAdministrator,
  ReadUserValidator(),
  UpdateUserValidator()
], async (req, res, next) => {
  const { handler, scarlet } = req;
  const { body } = scarlet;
  const { id } = scarlet.param;

  const data = await handler.update(id, body);

  res.json({
    message: req.t('validations.model.success-update-data'),
    data
  });

  next();
});

router.delete('/:id', [
  isAdministrator,
  ReadUserValidator(),
  DeleteUserValidator()
], async (req, res, next) => {
  const { handler, scarlet } = req;
  const { id } = scarlet.param;

  const data = await handler.delete({ id });

  res.json({
    message: req.t('validations.model.success-delete-data'),
    data
  });

  next();
});

module.exports = router;
