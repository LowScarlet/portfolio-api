const { checkSchema } = require('express-validator');

const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { ValidateSchemaModel, ValidateSchemaDefault } = require('../../../utils/services/ValidateSchema');

const config = {
  //
};

const FilterSchema = () => ({
  //
});

const ModelSchema = (options) => {
  const { customModel, checkIn, errorIf } = options;
  const configSchema = {
    checkIn,
    errorIf,
    dbModel: customModel || dbModel
  };

  return {
    // Id
    ...ValidateSchemaModel({
      ...configSchema,
      index: 'id',
    }),

    // Name
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'name',
    }),

    // Url
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'url',
    }),

    // IsVerified
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'isVerified',
      changeValue: (x) => (x === 'true'),
      other: {
        isBoolean: { errorMessage: 'validations.invalid-type' }
      }
    }),

  };
};

function CreateValidator() {
  const { name, url, isVerified } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    name: { ...name, notEmpty: { errorMessage: 'validations.required' } },
    url: { ...url, notEmpty: { errorMessage: 'validations.required' } },
    isVerified: { ...isVerified, optional: true },
  };

  return [
    SchemaValidatorHandler([checkSchema(input)])
  ];
}

function ReadValidator() {
  const { id } = ModelSchema({
    checkIn: ['params'],
    errorIf: 'notExist'
  });

  const input = {
    id: { ...id, exists: { errorMessage: 'validations.required', } }
  };

  return SchemaValidatorHandler([checkSchema(input)]);
}

function UpdateValidator() {
  const { name, url, isVerified } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    name: { ...name, optional: true },
    url: { ...url, optional: true },
    isVerified: { ...isVerified, optional: true },
  };

  return [
    SchemaValidatorHandler([checkSchema(input)])
  ];
}

function DeleteValidator() {
  return SchemaValidatorHandler([]);
}

function WheresValidator() {
  const input = FilterSchema();

  return SchemaValidatorHandler([checkSchema(input)]);
}

module.exports = {
  // Config
  config,
  ModelSchema,
  FilterSchema,

  // CRUD
  CreateValidator,
  ReadValidator,
  UpdateValidator,
  DeleteValidator,

  // OTHER
  WheresValidator
};
