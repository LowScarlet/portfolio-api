const { checkSchema } = require('express-validator');
const SchemaValidatorHandler = require('../../../../utils/services/SchemaValidatorHandler');
const { ModelSchema } = require('../../../rest/portfolio/Validators');

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

module.exports = {
  CreateValidator
};
