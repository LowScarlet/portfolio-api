const { body } = require('express-validator');
const i18next = require('i18next');

const { db } = require('../../../../utils/database');

function AuthRegisterValidator() {
  return [
    body('username')
      .custom(async (username) => {
        if (username != null) {
          const user = await db.user.findUnique({
            where: { username }
          });
          if (user) throw new Error('validations.already-exist');
        }
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
  ];
}

module.exports = AuthRegisterValidator;
