const { checkSchema } = require('express-validator');

const i18next = require('i18next');
const { Role } = require('@prisma/client');
const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { hashPassword } = require('../../auth/Services');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');

const config = {
  username: {
    isLength: { min: 6, max: 24 },
    matches: /^[a-zA-Z][a-zA-Z0-9_]*$/
  },
  password: {
    isLength: { min: 6, max: 128 },
  }
};

const FilterSchema = () => ({
  username: {
    in: ['query'],
    custom: { options: async (username, { req }) => { req.scarlet.query.username = { contains: username, mode: 'insensitive' }; }, },
    optional: true,
  },
  email: {
    in: ['query'],
    custom: { options: async (email, { req }) => { req.scarlet.query.email = { contains: email, mode: 'insensitive' }; }, },
    optional: true,
  },
  role: {
    in: ['query'],
    custom: { options: async (role, { req }) => { if (!Role[role]) throw new Error('validations.invalid-type'); req.scarlet.query.role = role; }, },
    optional: true,
  },
  isActive: {
    in: ['query'],
    custom: { options: async (isActive, { req }) => { req.scarlet.query.isActive = isActive; }, },
    isBoolean: { errorMessage: 'validations.invalid-type' },
    optional: true,
  },
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

    // Username
    ...ValidateSchemaModel({
      ...configSchema,
      index: 'username',
      other: {
        isLength: {
          options: config.username.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.username.isLength),
        },
        matches: {
          options: config.username.matches,
          errorMessage: 'validations.only-alphanumeric-and-underscore',
        }
      }
    }),

    // Email
    ...ValidateSchemaModel({
      ...configSchema,
      index: 'email',
      other: {
        isEmail: { errorMessage: 'validations.invalid-type', }
      }
    }),

    // Password
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'password',
      changeValue: hashPassword,
      other: {
        isLength: {
          options: config.password.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.password.isLength),
        }
      }
    }),

    // Role
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'role',
      custom: {
        options: async (value, { req }) => {
          if (!Role[value]) throw new Error('validations.invalid-type');
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].role = value;
          }
        },
        errorMessage: 'validations.invalid-type',
      },
    }),

    // IsActive
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'isActive',
      changeValue: (x) => (x === 'true'),
      other: {
        isBoolean: { errorMessage: 'validations.invalid-type' }
      }
    }),
  };
};

function CreateValidator() {
  const { username, email, password, role, isActive } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    username: { ...username, notEmpty: { errorMessage: 'validations.required' } },
    email: { ...email, notEmpty: { errorMessage: 'validations.required', } },
    password: { ...password, notEmpty: { errorMessage: 'validations.required', } },
    role: { ...role, optional: true },
    isActive: { ...isActive, optional: true },
  };

  return SchemaValidatorHandler([checkSchema(input)]);
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
  const { username, email, password, role, isActive } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    username: { ...username, optional: true },
    email: { ...email, optional: true },
    password: { ...password, optional: true },
    role: { ...role, optional: true },
    isActive: { ...isActive, optional: true },
  };

  return SchemaValidatorHandler([checkSchema(input)]);
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
