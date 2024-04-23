const multer = require('multer');
const ValidationException = require('../exceptions/ValidationException');

const FileValidatorHandler = (validations) => (req, res, next) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validation of validations) {
    validation(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        const { field, code } = err;
        const error = [{ path: field, msg: code }];
        return next(new ValidationException(error));
      }

      return next();
    });
  }
};

module.exports = FileValidatorHandler;
