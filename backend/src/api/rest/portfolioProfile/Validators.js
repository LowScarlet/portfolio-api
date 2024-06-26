const { checkSchema } = require('express-validator');

const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { db } = require('../../../utils/database');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');
require('i18next');

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

    // FullName
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'fullName',
    }),

    // Label
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'label',
    }),

    // Nickname
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'nickname',
    }),

    // About
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'about',
    }),

    // Country
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'country',
    }),

    // Email
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'email',
    }),

    // Phone
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'phone',
    }),

    // Website
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'website',
    }),

    // PortfolioId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'portfolioId',
      custom: {
        options: async (value, { req }) => {
          const portfolio = await db.portfolio.findUnique({ where: { id: value }, include: { PortfolioProfile: true } });
          if (!portfolio) throw new Error('validations.model.data-not-found');
          if (portfolio.PortfolioProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.portfolioId = value;
        },
      },
    }),

  };
};

function CreateValidator() {
  const { fullName, label, nickname, about, country, email, phone, website, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    fullName: { ...fullName, optional: true },
    label: { ...label, optional: true },
    nickname: { ...nickname, optional: true },
    about: { ...about, optional: true },
    country: { ...country, optional: true },
    email: { ...email, optional: true },
    phone: { ...phone, optional: true },
    website: { ...website, optional: true },
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
  const { fullName, label, nickname, about, country, email, phone, website, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    fullName: { ...fullName, optional: true },
    label: { ...label, optional: true },
    nickname: { ...nickname, optional: true },
    about: { ...about, optional: true },
    country: { ...country, optional: true },
    email: { ...email, optional: true },
    phone: { ...phone, optional: true },
    website: { ...website, optional: true },
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
