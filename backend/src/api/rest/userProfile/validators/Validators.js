/* eslint-disable no-unused-vars */
const { body, param, query } = require('express-validator');

const i18next = require('i18next');
const { db } = require('../../../../utils/database');

function CreateUserProfileValidator() {
  return [
    body('avatar')
      .optional(),
    body('fullName')
      .isLength({ min: 6, max: 100 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 100 }))
      .optional(),
    body('bio')
      .isLength({ min: 15, max: 255 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 15, max: 255 }))
      .optional(),
    body('userId')
      .custom(async (userId) => {
        const userProfile = await db.userProfile.findUnique({
          where: {
            userId
          }
        });
        if (userProfile) throw new Error('validations.already-exist');
      })
      .notEmpty()
      .withMessage('validations.required'),
  ];
}

function ReadUserProfileValidator() {
  return [
    param('userProfileId')
      .if(param('userProfileId').exists())
      .custom(async (userProfileId) => {
        const user = await db.userProfile.findUnique({
          where: {
            id: userProfileId
          }
        });
        if (!user) throw new Error('validations.model.data-not-found');
      })
      .optional()
  ];
}

function UpdateUserProfileValidator() {
  return [
    body('avatar')
      .optional(),
    body('fullName')
      .isLength({ min: 6, max: 100 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 100 }))
      .optional(),
    body('bio')
      .isLength({ min: 15, max: 255 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 15, max: 255 }))
      .optional()
  ];
}

function DeleteUserProfileValidator() {
  return [];
}

function WhereUserProfilesValidator() {
  return [
    query('avatar')
      .optional(),
    query('fullName')
      .optional(),
    query('bio')
      .optional()
  ];
}

module.exports = {
  // CRUD
  CreateUserProfileValidator,
  ReadUserProfileValidator,
  UpdateUserProfileValidator,
  DeleteUserProfileValidator,

  // OTHER
  WhereUserProfilesValidator
};
