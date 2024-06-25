const { checkSchema } = require('express-validator');
const { ModelSchema } = require('../../rest/user/Validators');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');

function UpdateValidator() {
  const { username, email, password } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    username: { ...username, optional: true },
    email: { ...email, optional: true },
    password: { ...password, optional: true },
  };

  return SchemaValidatorHandler([checkSchema(input)]);
}

module.exports = {
  UpdateValidator
};
