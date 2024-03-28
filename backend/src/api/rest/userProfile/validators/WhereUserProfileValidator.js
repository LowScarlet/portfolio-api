/* eslint-disable no-unused-vars */
const { query } = require('express-validator');
const i18next = require('i18next');

function WhereUserProfileValidator() {
  return [
    query('avatar')
      .optional(),
    query('fullName')
      .optional(),
    query('bio')
      .optional()
  ];
}

module.exports = WhereUserProfileValidator;
