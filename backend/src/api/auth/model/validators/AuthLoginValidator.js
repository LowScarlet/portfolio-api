const { body } = require('express-validator');

function AuthLoginValidator() {
  return [
    body('email')
      .isEmail()
      .withMessage('validations.invalid-type')
      .notEmpty()
      .withMessage('validations.required'),
    body('password')
      .notEmpty()
      .withMessage('validations.required'),
  ];
}

module.exports = AuthLoginValidator;
