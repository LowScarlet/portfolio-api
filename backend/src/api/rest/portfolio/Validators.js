const { checkSchema } = require('express-validator');

const i18next = require('i18next');
const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');

const config = {
  name: {
    isLength: { min: 6, max: 64 },
  },
  description: {
    isLength: { min: 0, max: 128 },
  }
};

const FilterSchema = () => ({
  name: {
    in: ['query'],
    custom: { options: async (name, { req }) => { req.scarlet.query.name = { contains: name, mode: 'insensitive' }; }, },
    optional: true,
  },
  description: {
    in: ['query'],
    custom: { options: async (description, { req }) => { req.scarlet.query.description = { contains: description, mode: 'insensitive' }; }, },
    optional: true,
  },
  isActive: {
    in: ['query'],
    custom: { options: async (isActive, { req }) => { req.scarlet.query.isActive = isActive; }, },
    isBoolean: { errorMessage: 'validations.invalid-type' },
    optional: true,
  },
  ownerId: {
    in: ['query'],
    custom: { options: async (ownerId, { req }) => { req.scarlet.query.ownerId = ownerId; }, },
    optional: true,
  },
});

const ModelSchema = (options) => {
  const { checkIn } = options;
  return {
    // Id
    id: {
      in: checkIn,
      custom: {
        options: async (id, { req }) => {
          const user = await dbModel.findUnique({ where: { id } });
          if (!user) throw new Error('validations.model.data-not-found');

          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].id = id;
          }
        }
      }
    },

    // Name
    name: {
      in: checkIn,
      custom: {
        options: async (name, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].name = name;
          }
        },
      },
      isLength: {
        options: config.name.isLength,
        errorMessage: () => i18next.t('validations.require-length-min-max', config.name.isLength),
      }
    },

    // Description
    description: {
      in: checkIn,
      custom: {
        options: async (description, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = description;
          }
        },
      },
      isLength: {
        options: config.description.isLength,
        errorMessage: () => i18next.t('validations.require-length-min-max', config.description.isLength),
      }
    },

    // IsPublic
    isPublic: {
      in: checkIn,
      toBoolean: true,
      custom: {
        options: async (isPublic, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].isPublic = isPublic;
          }
        },
      },
      isBoolean: { errorMessage: 'validations.invalid-type' }
    },
  };
};

function CreateValidator() {
  const { name, description, isPublic, ownerId } = ModelSchema({
    checkIn: ['body']
  });

  const input = {
    name: { ...name, optional: true },
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
    checkIn: ['params']
  });

  const input = {
    id: { ...id, exists: { errorMessage: 'validations.required', } }
  };

  return SchemaValidatorHandler([checkSchema(input)]);
}

function UpdateValidator() {
  const { name, description, isPublic, ownerId } = ModelSchema({
    checkIn: ['body']
  });

  const input = {
    name: { ...name, optional: true },
    description: { ...description, optional: true },
    isPublic: { ...isPublic, optional: true },
    ownerIdId: { ...ownerId, optional: true },
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
