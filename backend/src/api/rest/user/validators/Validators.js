const { body, param, query } = require('express-validator');

const i18next = require('i18next');
const { Role } = require('@prisma/client');
const { db } = require('../../../../utils/database');
const validateValidationChain = require('../../../../utils/middlewares/validateValidationChain');

function CreateValidator() {
  return validateValidationChain([
    body('username')
      .custom(async (username, { req }) => {
        const user = await db.user.findUnique({ where: { username } });
        if (user) throw new Error('validations.already-exist');

        req.scarlet.body.username = username;
      })
      .isLength({ min: 6, max: 24 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 24 }))
      .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/)
      .withMessage('validations.only-alphanumeric-and-underscore')
      .notEmpty()
      .withMessage('validations.required'),

    body('email')
      .custom(async (email, { req }) => {
        if (!email) return;
        const user = await db.user.findUnique({ where: { email } });
        if (user) throw new Error('validations.already-exist');

        req.scarlet.body.email = email;
      })
      .isEmail()
      .withMessage('validations.invalid-type')
      .notEmpty()
      .withMessage('validations.required'),

    body('password')
      .custom(async (password, { req }) => {
        req.scarlet.body.password = password;
      })
      .isLength({ min: 6, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 128 }))
      .notEmpty()
      .withMessage('validations.required'),

    body('role')
      .custom(async (role, { req }) => {
        if (!Role[role]) throw new Error('validations.invalid-type');

        req.scarlet.body.role = role;
      })
      .notEmpty()
      .withMessage('validations.required'),

    body('isActive')
      .toBoolean()
      .custom(async (isActive, { req }) => {
        req.scarlet.body.isActive = isActive;
      })
      .isBoolean()
      .withMessage('validations.invalid-type')
      .notEmpty()
      .withMessage('validations.required'),
  ]);
}

function ReadValidator() {
  return [
    param('id')
      .if(param('id').exists())
      .custom(async (id, { req }) => {
        const user = await db.user.findUnique({ where: { id } });
        if (!user) throw new Error('validations.model.data-not-found');

        req.scarlet.param.id = id;
      })
      .optional()
  ];
}

function UpdateValidator() {
  return [
    body('username')
      .custom(async (username, { req }) => {
        const user = await db.user.findUnique({ where: { username } });
        if (user) throw new Error('validations.already-exist');

        req.scarlet.body.username = username;
      })
      .isLength({ min: 6, max: 24 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 24 }))
      .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/)
      .withMessage('validations.only-alphanumeric-and-underscore')
      .optional(),

    body('email')
      .custom(async (email, { req }) => {
        if (!email) return;
        const user = await db.user.findUnique({ where: { email } });
        if (user) throw new Error('validations.already-exist');

        req.scarlet.body.email = email;
      })
      .isEmail()
      .withMessage('validations.invalid-type')
      .optional(),

    body('password')
      .custom(async (password, { req }) => {
        req.scarlet.body.password = password;
      })
      .isLength({ min: 6, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 128 }))
      .optional(),

    body('role')
      .custom(async (role, { req }) => {
        if (!Role[role]) throw new Error('validations.invalid-type');

        req.scarlet.body.role = role;
      })
      .optional(),

    body('isActive')
      .toBoolean()
      .custom(async (isActive, { req }) => {
        req.scarlet.body.isActive = isActive;
      })
      .isBoolean()
      .withMessage('validations.invalid-type')
      .optional(),
  ];
}

function DeleteValidator() {
  return [];
}

function WheresValidator() {
  return [
    query('username')
      .custom(async (username, { req }) => {
        req.scarlet.query.username = { contains: username };
      })
      .optional(),
    query('email')
      .custom(async (email, { req }) => {
        req.scarlet.query.email = { contains: email };
      })
      .optional(),
    query('role')
      .custom(async (role, { req }) => {
        if (!Role[role]) throw new Error('validations.invalid-type');

        req.scarlet.query.role = role;
      })
      .optional(),
    query('isActive')
      .toBoolean()
      .custom(async (isActive, { req }) => {
        req.scarlet.query.isActive = isActive;
      })
      .isBoolean()
      .withMessage('validations.invalid-type')
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
