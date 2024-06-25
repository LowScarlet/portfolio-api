const { Router } = require('express');

const PaginationValidator = require('../../../utils/validators/PaginationValidator');

const router = Router();
const { CreateValidator, WheresValidator, ReadValidator, UpdateValidator, DeleteValidator } = require('./Validators');
const { dbModel, viewField } = require('./Services');
const { isAdministrator } = require('../user/Middlewares');
const CrudHandler = require('../../../utils/services/CrudHandler');
const { IsAuthenticated } = require('../../auth/Middlewares');

const handler = new CrudHandler(dbModel);

router.use((req, res, next) => {
  handler.setViewField(viewField(req.user));
  next();
});

router.post('/', [
  IsAuthenticated,
  isAdministrator,
  CreateValidator(),
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { body } = scarlet;

    const data = await handler.create(body);

    res.json({
      message: req.t('validations.model.success-create-data'),
      data
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', [
  PaginationValidator(),
  WheresValidator(),
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { query } = scarlet;
    const { skip, take } = scarlet.pagination;

    const data = await handler.reads(query, skip, take);

    res.json({
      message: req.t('validations.model.success-read-all-data'),
      data,
      skip,
      take
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', [
  ReadValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { id } = scarlet.params;

    const data = await handler.read(id);

    res.json({
      message: req.t('validations.model.success-read-data'),
      data
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', [
  IsAuthenticated,
  isAdministrator,
  ReadValidator(),
  UpdateValidator(),
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { body } = scarlet;
    const { id } = scarlet.params;

    const data = await handler.update(id, body);

    res.json({
      message: req.t('validations.model.success-update-data'),
      data
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', [
  IsAuthenticated,
  isAdministrator,
  ReadValidator(),
  DeleteValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { id } = scarlet.params;

    const data = await handler.delete(id);

    res.json({
      message: req.t('validations.model.success-delete-data'),
      data
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
