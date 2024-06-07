const { checkSchema } = require('express-validator');

const { dbModel } = require('./Services');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
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
  fullName: {
    in: ['query'],
    custom: { options: async (fullName, { req }) => { req.scarlet.query.fullName = { contains: fullName, mode: 'insensitive' }; }, },
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

    // FullName
    fullName: {
      in: checkIn,
      custom: {
        options: async (fullName, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].name = fullName;
          }
        },
      },
    },

    // Label
    label: {
      in: checkIn,
      custom: {
        options: async (label, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = label;
          }
        },
      },
    },

    // Nickname
    nickname: {
      in: checkIn,
      custom: {
        options: async (nickname, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = nickname;
          }
        },
      },
    },

    // About
    about: {
      in: checkIn,
      custom: {
        options: async (about, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = about;
          }
        },
      },
    },

    // Country
    country: {
      in: checkIn,
      custom: {
        options: async (country, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = country;
          }
        },
      },
    },

    // Email
    email: {
      in: checkIn,
      custom: {
        options: async (email, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = email;
          }
        },
      },
    },

    // Phone
    phone: {
      in: checkIn,
      custom: {
        options: async (phone, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = phone;
          }
        },
      },
    },

    // Website
    website: {
      in: checkIn,
      custom: {
        options: async (website, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].description = website;
          }
        },
      },
    },

    // PortfolioId
    portfolioId: {
      in: checkIn,
      custom: {
        options: async (portfolioId, { req }) => {
          const portfolio = await db.portfolio.findUnique({ where: { id: portfolioId }, include: { PorfolioProfile: true } });
          if (!portfolio) throw new Error('validations.model.data-not-found');
          if (portfolio.PorfolioProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.userId = portfolioId;
        },
      },
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
