const { checkSchema } = require('express-validator');

const { DegreeLevel } = require('@prisma/client');
const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');
const { db } = require('../../../utils/database');

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

    // DegreeLevel
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'degreeLevel',
      custom: {
        options: async (value, { req }) => {
          if (!DegreeLevel[value]) throw new Error('validations.invalid-type');
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].degreeLevel = value;
          }
        },
        errorMessage: 'validations.invalid-type',
      },
    }),

    // Description
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'description',
    }),

    // Score
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'score',
    }),

    // DissertationTitle
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'dissertationTitle',
    }),

    // StartAt
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'startAt',
    }),

    // EndAt
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'endAt',
    }),

    // DepartmentId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'departmentId',
      custom: {
        options: async (value, { req }) => {
          const department = await db.department.findUnique({ where: { id: value } });
          if (!department) throw new Error('validations.model.data-not-found');

          req.scarlet.body.departmentId = value;
        },
      },
    }),

    // InstitutionId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'institutionId',
      custom: {
        options: async (value, { req }) => {
          const institution = await db.institution.findUnique({ where: { id: value } });
          if (!institution) throw new Error('validations.model.data-not-found');

          req.scarlet.body.institutionId = value;
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
  const { degreeLevel, description, score, dissertationTitle, startAt, endAt, departmentId, institutionId, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    degreeLevel: { ...degreeLevel, optional: true },
    description: { ...description, optional: true },
    score: { ...score, optional: true },
    dissertationTitle: { ...dissertationTitle, optional: true },
    startAt: { ...startAt, optional: true },
    endAt: { ...endAt, optional: true },
    departmentId: { ...departmentId, optional: true },
    institutionId: { ...institutionId, notEmpty: { errorMessage: 'validations.required' } },
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
  const { degreeLevel, description, score, dissertationTitle, startAt, endAt, departmentId, institutionId, portfolioId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    degreeLevel: { ...degreeLevel, optional: true },
    description: { ...description, optional: true },
    score: { ...score, optional: true },
    dissertationTitle: { ...dissertationTitle, optional: true },
    startAt: { ...startAt, optional: true },
    endAt: { ...endAt, optional: true },
    departmentId: { ...departmentId, optional: true },
    institutionId: { ...institutionId, optional: true },
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
