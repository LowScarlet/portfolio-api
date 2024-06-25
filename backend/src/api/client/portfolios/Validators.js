const { checkSchema } = require('express-validator');
const { ModelSchema } = require('../../rest/portfolio/Validators');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');

function CreateValidator() {
  const { name, description } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    name: { ...name, notEmpty: { errorMessage: 'validations.required' } },
    description: { ...description, optional: true },
  };

  return [
    SchemaValidatorHandler([checkSchema(input)])
  ];
}

function ReadValidator() {
  const { id } = ModelSchema({
    checkIn: ['query'],
    errorIf: 'notExist'
  });

  const input = {
    id: { ...id, optional: true }
  };

  return SchemaValidatorHandler([checkSchema(input)]);
}

module.exports = {
  CreateValidator,
  ReadValidator
};
