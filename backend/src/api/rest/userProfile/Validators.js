const { body, param, query } = require('express-validator');

const i18next = require('i18next');
const validateValidationChain = require('../../../utils/middlewares/validateValidationChain');
const { dbModel } = require('./Services');

function CreateValidator() {
  return validateValidationChain([
    body('avatar')
      .custom(async (avatar, { req }) => {
        req.scarlet.body.avatar = avatar;
      })
      .optional(),

    body('fullName')
      .custom(async (fullName, { req }) => {
        req.scarlet.body.fullName = fullName;
      })
      .isLength({ min: 6, max: 64 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 64 }))
      .optional(),

    body('bio')
      .custom(async (bio, { req }) => {
        req.scarlet.body.bio = bio;
      })
      .isLength({ min: 0, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 0, max: 225 }))
      .optional(),

    body('userId')
      .custom(async (userId, { req }) => {
        req.scarlet.body.User = { connect: { id: userId } };
      })
      .notEmpty()
      .withMessage('validations.required'),
  ]);
}

function ReadValidator() {
  return [
    param('id')
      .if(param('id').exists())
      .custom(async (id, { req }) => {
        const user = await dbModel.findUnique({ where: { id } });
        if (!user) throw new Error('validations.model.data-not-found');

        req.scarlet.param.id = id;
      })
      .optional()
  ];
}

function UpdateValidator() {
  return [
    body('avatar')
      .custom(async (avatar, { req }) => {
        req.scarlet.body.avatar = avatar;
      })
      .optional(),

    body('fullName')
      .custom(async (fullName, { req }) => {
        req.scarlet.body.fullName = fullName;
      })
      .isLength({ min: 6, max: 64 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 64 }))
      .optional(),

    body('bio')
      .custom(async (bio, { req }) => {
        req.scarlet.body.bio = bio;
      })
      .isLength({ min: 0, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 0, max: 225 }))
      .optional(),

    body('userId')
      .toBoolean()
      .custom(async (userId, { req }) => {
        req.scarlet.body.userId = userId;
        req.scarlet.body.User = { connect: { id: userId } };
      })
      .optional(),
  ];
}

function DeleteValidator() {
  return [];
}

function WheresValidator() {
  return [
    query('avatar')
      .custom(async (avatar, { req }) => {
        req.scarlet.query.avatar = avatar;
      })
      .optional(),
    query('fullName')
      .custom(async (fullName, { req }) => {
        req.scarlet.query.fullName = { contains: fullName };
      })
      .optional(),
    query('bio')
      .custom(async (bio, { req }) => {
        req.scarlet.query.bio = { contains: bio };
      })
      .optional(),
    query('userId')
      .custom(async (userId, { req }) => {
        req.scarlet.query.userId = userId;
      })
      .optional(),
  ];
}

module.exports = {
  // CRUD
  CreateValidator,
  ReadValidator,
  UpdateValidator,
  DeleteValidator,

  // OTHER
  WheresValidator
};
