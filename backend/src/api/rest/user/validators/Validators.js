/* eslint-disable no-unused-vars */
const { body, param, query } = require('express-validator');

const i18next = require('i18next');
const { Role } = require('@prisma/client');
const { db } = require('../../../../utils/database');
const stringToBoolean = require('../../../../utils/stringToBoolean');

function CreateUserValidator() {
  return [
    body('username')
      .custom(async (username) => {
        const user = await db.user.findUnique({
          where: {
            username
          }
        });
        if (user) throw new Error('validations.already-exist');
      })
      .isLength({ min: 6, max: 24 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 24 }))
      .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/)
      .withMessage('validations.only-alphanumeric-and-underscore')
      .notEmpty()
      .withMessage('validations.required'),
    body('email')
      .custom(async (email) => {
        if (email != null) {
          const user = await db.user.findUnique({
            where: { email }
          });
          if (user) throw new Error('validations.already-exist');
        }
      })
      .isEmail()
      .withMessage('validations.invalid-type')
      .notEmpty()
      .withMessage('validations.required'),
    body('password')
      .isLength({ min: 6, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 128 }))
      .notEmpty()
      .withMessage('validations.required'),
    body('role')
      .custom(async (role) => {
        if (!Role[role]) throw new Error('validations.invalid-type');
      })
      .notEmpty()
      .withMessage('validations.required'),
    body('isActive')
      .isBoolean()
      .withMessage('validations.invalid-type')
      .notEmpty()
      .withMessage('validations.required'),
  ];
}

function ReadUserValidator() {
  return [
    param('userId')
      .if(param('userId').exists())
      .custom(async (userId) => {
        const user = await db.user.findUnique({
          where: {
            id: userId
          }
        });
        if (!user) throw new Error('validations.model.data-not-found');
      })
      .optional()
  ];
}

function UpdateUserValidator() {
  return [
    body('username')
      .custom(async (username) => {
        const user = await db.user.findUnique({
          where: {
            username
          }
        });
        if (user) throw new Error('validations.already-exist');
      })
      .isLength({ min: 6, max: 24 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 24 }))
      .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/)
      .withMessage('validations.only-alphanumeric-and-underscore')
      .optional(),
    body('email')
      .custom(async (email) => {
        if (email != null) {
          const user = await db.user.findUnique({
            where: { email }
          });
          if (user) throw new Error('validations.already-exist');
        }
      })
      .isEmail()
      .withMessage('validations.invalid-type')
      .optional(),
    body('password')
      .isLength({ min: 6, max: 128 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 128 }))
      .optional(),
    body('role')
      .custom(async (role) => {
        if (!Role[role]) throw new Error('validations.invalid-type');
      })
      .optional(),
    body('isActive')
      .isBoolean()
      .withMessage('validations.invalid-type')
      .optional(),
  ];
}

function DeleteUserValidator() {
  return [];
}

function WhereUsersValidator() {
  return [
    query('username')
      .optional(),
    query('email')
      .optional(),
    query('role')
      .custom(async (role) => {
        if (!Role[role]) throw new Error('validations.invalid-type');
      })
      .optional(),
    query('isActive')
      .custom(async (isActive, { req }) => {
        if (!(typeof stringToBoolean(isActive) === 'boolean')) throw new Error('validations.invalid-type');
      })
      .optional(),
  ];
}

module.exports = {
  // CRUD
  CreateUserValidator,
  ReadUserValidator,
  UpdateUserValidator,
  DeleteUserValidator,

  // OTHER
  WhereUsersValidator
};
