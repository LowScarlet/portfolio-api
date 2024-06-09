const { checkSchema } = require('express-validator');

const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { db } = require('../../../utils/database');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');

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

    // Identifier
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'identifier',
    }),

    // SocialMediaId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'socialMediaId',
      custom: {
        options: async (value, { req }) => {
          const socialMedia = await db.socialMedia.findUnique({ where: { id: value } });
          if (!socialMedia) throw new Error('validations.model.data-not-found');

          req.scarlet.body.socialMediaId = value;
        },
      },
    }),

    // PortfolioId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'portfolioId',
      custom: {
        options: async (value, { req }) => {
          const portfolio = await db.portfolio.findUnique({ where: { id: value } });
          if (!portfolio) throw new Error('validations.model.data-not-found');

          req.scarlet.body.portfolioId = value;
        },
      },
    }),

  };
};

function CreateValidator() {
  const { identifier, socialMediaId, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    identifier: { ...identifier, optional: true },
    socialMediaId: { ...socialMediaId, notEmpty: { errorMessage: 'validations.required' } },
    portfolioId: { ...portfolioId, notEmpty: { errorMessage: 'validations.required' } },
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
  const { identifier, socialMediaId, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    identifier: { ...identifier, optional: true },
    socialMediaId: { ...socialMediaId, optional: true },
    portfolioId: { ...portfolioId, optional: true },
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
