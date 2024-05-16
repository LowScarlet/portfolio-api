const { validationResult } = require('express-validator');
const ValidationException = require('../exceptions/ValidationException');

const SchemaValidatorHandler = (validations) => async (req, res, next) => {
  try {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return next(new ValidationException(errors.array()));
  } catch (error) {
    return next(error);
  }
};

module.exports = SchemaValidatorHandler;
