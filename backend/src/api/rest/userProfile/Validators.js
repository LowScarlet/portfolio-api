const { checkSchema } = require('express-validator');

const sharp = require('sharp');
const i18next = require('i18next');
const { dbModel } = require('./Services');
const { db } = require('../../../utils/database');
const fileUploadName = require('../../../utils/fileUploadName');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const { ValidateSchemaModel, ValidateSchemaDefault, ValidateSchemaCustom } = require('../../../utils/services/ValidateSchema');

const config = {
  fullName: {
    isLength: { min: 6, max: 64 },
  },
  bio: {
    isLength: { min: 0, max: 128 },
  }
};

const FilterSchema = () => ({
  fullName: {
    in: ['query'],
    custom: { options: async (fullName, { req }) => { req.scarlet.query.fullName = { contains: fullName, mode: 'insensitive' }; }, },
    optional: true,
  },
  bio: {
    in: ['query'],
    custom: { options: async (bio, { req }) => { req.scarlet.query.bio = { contains: bio, mode: 'insensitive' }; }, },
    optional: true,
  },
  userId: {
    in: ['query'],
    custom: { options: async (userId, { req }) => { req.scarlet.query.userId = userId; }, },
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

    // Avatar
    avatar: {
      in: checkIn,
      custom: {
        options: async (x, { req }) => {
          const { files } = req;

          const uploadedFile = files[0];

          if (!uploadedFile) {
            return;
          }

          const maxSizeBytes = 2 * 1024 * 1024;
          if (uploadedFile.size > maxSizeBytes) {
            throw new Error('validations.file-upload.max-size');
          }

          if (!uploadedFile.mimetype.startsWith('image/')) {
            throw new Error('validations.file-upload.images.invalid-type');
          }

          const metadata = await sharp(uploadedFile.buffer).metadata();
          const { width, height } = metadata;

          if (width !== height) {
            throw new Error('validations.file-upload.images.ratio-1-1');
          }

          const hashName = fileUploadName(uploadedFile);

          req.files[0].originalname = hashName;
          req.scarlet.body.avatar = hashName;
        },
      },
    },

    // FullName
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'fullName',
      other: {
        isLength: {
          options: config.fullName.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.fullName.isLength),
        }
      }
    }),

    // Bio
    ...ValidateSchemaDefault({
      ...configSchema,
      index: 'bio',
      other: {
        isLength: {
          options: config.bio.isLength,
          errorMessage: () => i18next.t('validations.require-length-min-max', config.bio.isLength),
        }
      }
    }),

    // UserId
    ...ValidateSchemaCustom({
      ...configSchema,
      index: 'userId',
      custom: {
        options: async (value, { req }) => {
          const user = await db.user.findUnique({ where: { id: value }, include: { UserProfile: true } });
          if (!user) throw new Error('validations.model.data-not-found');
          if (user.UserProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.userId = value;
        },
      },
    }),
  };
};

function CreateValidator() {
  const { fullName, bio, userId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
    userId: { ...userId, notEmpty: { errorMessage: 'validations.required', } },
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
  const { fullName, bio, userId } = ModelSchema({
    checkIn: ['body'],
    errorIf: 'exist'
  });

  const input = {
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
    userId: { ...userId, optional: true },
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
