/* eslint-disable no-unused-vars */
const { Role } = require('@prisma/client');
const { query } = require('express-validator');
const stringToBoolean = require('../../../../utils/stringToBoolean');

function WhereUsersValidator() {
  return [
    query('username')
      .optional(),
    query('email')
      .optional(),
    query('role')
      .custom(async (role) => {
        if (!Role[role]) throw new Error('validations.invalid-type');
      })
      .optional(),
    query('isActive')
      .custom(async (isActive, { req }) => {
        if (!(typeof stringToBoolean(isActive) === 'boolean')) throw new Error('validations.invalid-type');
      })
      .optional(),
  ];
}

module.exports = WhereUsersValidator;
