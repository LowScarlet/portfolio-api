const { checkSchema } = require('express-validator');

const sharp = require('sharp');
const i18next = require('i18next');
const { dbModel } = require('./Services');
const { db } = require('../../../utils/database');
const FileValidatorHandler = require('../../../utils/services/FileValidatorHandler');
const fileUploadName = require('../../../utils/fileUploadName');
const SchemaValidatorHandler = require('../../../utils/services/SchemaValidatorHandler');
const multerHandler = require('../../../utils/multerHandler');

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
    fullName: {
      in: checkIn,
      custom: {
        options: async (fullName, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].fullName = fullName;
          }
        },
      },
      isLength: {
        options: config.fullName.isLength,
        errorMessage: () => i18next.t('validations.require-length-min-max', config.fullName.isLength),
      }
    },

    // Bio
    bio: {
      in: checkIn,
      custom: {
        options: async (bio, { req }) => {
          for (let i = 0; i < checkIn.length; i += 1) {
            req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
            req.scarlet[checkIn[i]].bio = bio;
          }
        },
      },
      isLength: {
        options: config.bio.isLength,
        errorMessage: () => i18next.t('validations.require-length-min-max', config.bio.isLength),
      }
    },

    // UserId
    userId: {
      in: checkIn,
      custom: {
        options: async (userId, { req }) => {
          const user = await db.user.findUnique({ where: { id: userId }, include: { UserProfile: true } });
          if (!user) throw new Error('validations.model.data-not-found');
          if (user.UserProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.userId = userId;
        },
      },
    },
  };
};

function CreateValidator() {
  const { avatar, fullName, bio, userId } = ModelSchema({
    checkIn: ['body']
  });

  const input = {
    avatar: {
      custom: {
        options: async (x, { req }) => {
          const { files } = req;

          const uploadedFile = files[0];

          if (!uploadedFile) {
            throw new Error('validations.required');
          }
        },
      },
      ...avatar,
      optional: true
    },
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
    userId: { ...userId, notEmpty: { errorMessage: 'validations.required' } },
  };

  return [
    FileValidatorHandler([
      multerHandler.array('avatar', 1),
    ]),
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
  const { avatar, fullName, bio, userId } = ModelSchema({
    checkIn: ['body']
  });

  const input = {
    avatar: { ...avatar },
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
    userId: { ...userId, optional: true },
  };

  return [
    FileValidatorHandler([
      multerHandler.array('avatar', 1),
    ]),
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
