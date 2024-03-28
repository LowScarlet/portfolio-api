const { body, query } = require('express-validator');

function PaginationValidator() {
  return [
    query('skip')
      .isNumeric()
      .withMessage('validations.must-numeric')
      .optional(),
    body('take')
      .custom(async (take) => {
        if (take != null) {
          if (take > 100) throw new Error('validations.pagination-take-safe-max');
        }
      })
      .isNumeric()
      .withMessage('validations.must-numeric')
      .optional(),
  ];
}

module.exports = PaginationValidator;
