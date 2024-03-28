const { body } = require('express-validator');

const i18next = require('i18next');
const { db } = require('../../../../utils/database');

function CreateUserProfileValidator() {
  return [
    body('avatar')
      .notEmpty()
      .withMessage('validations.required'),
    body('fullName')
      .isLength({ min: 6, max: 100 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 100 }))
      .notEmpty()
      .withMessage('validations.required'),
    body('bio')
      .isLength({ min: 15, max: 255 })
      .withMessage(() => i18next.t('validations.require-length-min-max', { min: 15, max: 255 }))
      .notEmpty()
      .withMessage('validations.required'),
    body('UserId')
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

module.exports = CreateUserProfileValidator;
