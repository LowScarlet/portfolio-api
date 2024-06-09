const { checkSchema } = require('express-validator');

const i18next = require('i18next');
const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');
const { db } = require('../../../utils/database');

const config = {
  name: {
    isLength: { min: 6, max: 64 },
  },
  description: {
    isLength: { min: 0, max: 128 },
  }
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
      other: {
        isLength: {
          options: config.name.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.name.isLength),
        }
      }
    }),

    // Description
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'description',
      other: {
        isLength: {
          options: config.description.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.description.isLength),
        }
      }
    }),

    // IsPublic
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'isPublic',
      changeValue: (x) => (x === 'true'),
      other: {
        isBoolean: { errorMessage: 'validations.invalid-type' }
      }
    }),

    // OwnerId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'ownerId',
      custom: {
        options: async (value, { req }) => {
          const user = await db.user.findUnique({ where: { id: value } });
          if (!user) throw new Error('validations.model.data-not-found');

          req.scarlet.body.ownerId = value;
        },
      },
    }),
  };
};

function CreateValidator() {
  const { name, description, isPublic } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const { ownerId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'notExist'
  });

  const input = {
    name: { ...name, notEmpty: { errorMessage: 'validations.required' } },
    description: { ...description, optional: true },
    isPublic: { ...isPublic, optional: true },
    ownerId: { ...ownerId, notEmpty: { errorMessage: 'validations.required' } },
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
  const { name, description, isPublic, ownerId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    name: { ...name, optional: true },
    description: { ...description, optional: true },
    isPublic: { ...isPublic, optional: true },
    ownerId: { ...ownerId, optional: true },
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
