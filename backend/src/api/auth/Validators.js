const { body } = require('express-validator');

const i18next = require('i18next');
const bcrypt = require('bcryptjs');
const ValidatorHandler = require('../../utils/services/ValidatorHandler');
const { db } = require('../../utils/database');
const { verifyRefreshToken, hashToken } = require('./Services');

function LoginValidator() {
  return ValidatorHandler([
    body('username')
      .custom(async (username) => {
        const user = await db.user.findUnique({ where: { username } });

        if (!user) throw new Error('validations.auth.user-not-found');
      })
      .notEmpty()
      .withMessage('validations.required'),
    body('password')
      .custom(async (password, { req }) => {
        const { username } = req.body;

        const user = await db.user.findUnique({ where: { username } });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('validations.auth.wrong-password');
        }

        req.scarlet.body.id = user.id;
      })
      .notEmpty()
      .withMessage('validations.required')
  ]);
}

function RegisterValidator() {
  return ValidatorHandler([
    body('username')
      .custom(async (username, { req }) => {
        const user = await db.user.findUnique({ where: { username } });

        if (user) throw new Error('validations.auth.username-exist');

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
        const user = await db.user.findUnique({ where: { email } });

        if (user) throw new Error('validations.auth.email-exist');

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
  ]);
}

function VerifyValidator() {
  return ValidatorHandler([
    body('refreshToken')
      .custom(async (refreshToken, { req }) => {
        const user = await verifyRefreshToken(refreshToken);

        if (!user) throw new Error('validations.auth.invalid-refresh-token');

        req.scarlet.body.refreshToken = refreshToken;
      })
      .notEmpty()
      .withMessage('validations.required')
  ]);
}

function LogoutValidator() {
  return ValidatorHandler([
    body('refreshToken')
      .custom(async (refreshToken, { req }) => {
        const token = hashToken(refreshToken);
        const refToken = await db.refreshToken.findUnique({
          where: {
            hashedToken: token
          }
        });
        if (!refToken || refToken.revoked) throw new Error('validations.auth.invalid-refresh-token');

        req.scarlet.body.refreshToken = refreshToken;
      })
      .notEmpty()
      .withMessage('validations.required')
  ]);
}

module.exports = {
  LoginValidator,
  RegisterValidator,
  VerifyValidator,
  LogoutValidator
};
