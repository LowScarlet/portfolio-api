const { body } = require('express-validator');

const i18next = require('i18next');

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

module.exports = UpdateUserProfileValidator;
