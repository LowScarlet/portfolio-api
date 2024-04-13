const { validationResult } = require('express-validator');
const ValidationException = require('../exceptions/ValidationException');

// eslint-disable-next-line consistent-return
const ValidatorHandler = (validations) => async (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validation of validations) {
    // eslint-disable-next-line no-await-in-loop
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return next(new ValidationException(errors.array()));
};

module.exports = ValidatorHandler;
