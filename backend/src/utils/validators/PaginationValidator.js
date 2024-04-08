const { body, query } = require('express-validator');

function PaginationValidator() {
  return [
    query('skip')
      .toInt()
      .custom(async (skip, { req }) => {
        req.scarPagination.skip = skip;
      })
      .isInt()
      .withMessage('validations.must-numeric')
      .optional(),
    body('take')
      .custom(async (take, { req }) => {
        if (!take) return;
        if (take > 100) throw new Error('validations.pagination-take-safe-max');

        req.scarPagination.take = take;
      })
      .toInt()
      .isInt()
      .withMessage('validations.must-numeric')
      .optional(),
  ];
}

module.exports = PaginationValidator;
