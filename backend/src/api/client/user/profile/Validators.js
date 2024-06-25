const { checkSchema } = require('express-validator');
const SchemaValidatorHandler = require('../../../../utils/services/SchemaValidatorHandler');
const { ModelSchema } = require('../../../rest/userProfile/Validators');

function UpdateValidator() {
  const { fullName, bio } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
  };

  return [
    SchemaValidatorHandler([checkSchema(input)])
  ];
}

module.exports = {
  UpdateValidator
};
