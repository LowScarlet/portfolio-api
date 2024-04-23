const { body, param, query, check } = require('express-validator');

const multer = require('multer');

const sharp = require('sharp');
const i18next = require('i18next');
const { dbModel } = require('./Services');
const { db } = require('../../../utils/database');
const ValidatorHandler = require('../../../utils/services/ValidatorHandler');
const FileValidatorHandler = require('../../../utils/services/FileValidatorHandler');
const fileUploadName = require('../../../utils/fileUploadName');

const upload = multer({ storage: multer.memoryStorage() });

function CreateValidator() {
  return [
    FileValidatorHandler([
      upload.array('avatar', 1),
    ]),
    ValidatorHandler([
      check('avatar')
        .custom(async (x, { req }) => {
          const { files } = req;

          const uploadedFile = files[0];

          if (!uploadedFile) {
            throw new Error('validations.required');
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
        }),

      body('fullName')
        .custom(async (fullName, { req }) => {
          req.scarlet.body.fullName = fullName;
        })
        .isLength({ min: 6, max: 64 })
        .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 64 }))
        .optional(),

      body('bio')
        .custom(async (bio, { req }) => {
          req.scarlet.body.bio = bio;
        })
        .isLength({ min: 0, max: 128 })
        .withMessage(() => i18next.t('validations.require-length-min-max', { min: 0, max: 225 }))
        .optional(),

      body('userId')
        .custom(async (userId, { req }) => {
          const user = await db.user.findUnique({ where: { id: userId }, include: { UserProfile: true } });
          if (!user) throw new Error('validations.model.data-not-found');
          if (user.UserProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.userId = userId;
        })
        .notEmpty()
        .withMessage('validations.required'),
    ])
  ];
}

function ReadValidator() {
  return ValidatorHandler([
    param('id')
      .if(param('id').exists())
      .custom(async (id, { req }) => {
        const user = await dbModel.findUnique({ where: { id } });
        if (!user) throw new Error('validations.model.data-not-found');

        req.scarlet.param.id = id;
      })
  ]);
}

function UpdateValidator() {
  return [
    FileValidatorHandler([
      upload.array('avatar', 1),
    ]),
    ValidatorHandler([
      check('avatar')
        .custom(async (x, { req }) => {
          const { files } = req;

          if (!files) {
            return;
          }

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
        }),

      body('fullName')
        .custom(async (fullName, { req }) => {
          req.scarlet.body.fullName = fullName;
        })
        .isLength({ min: 6, max: 64 })
        .withMessage(() => i18next.t('validations.require-length-min-max', { min: 6, max: 64 }))
        .optional(),

      body('bio')
        .custom(async (bio, { req }) => {
          req.scarlet.body.bio = bio;
        })
        .isLength({ min: 0, max: 128 })
        .withMessage(() => i18next.t('validations.require-length-min-max', { min: 0, max: 225 }))
        .optional(),

      body('userId')
        .toBoolean()
        .custom(async (userId, { req }) => {
          const user = await db.user.findUnique({ where: { id: userId }, include: { UserProfile: true } });
          if (!user) throw new Error('validations.model.data-not-found');
          if (user.UserProfile) throw new Error('validations.model.data-has-relation');

          req.scarlet.body.userId = userId;
        })
        .optional(),
    ])
  ];
}

function DeleteValidator() {
  return [];
}

function WheresValidator() {
  return ValidatorHandler([
    query('avatar')
      .custom(async (avatar, { req }) => {
        req.scarlet.query.avatar = avatar;
      })
      .optional(),
    query('fullName')
      .custom(async (fullName, { req }) => {
        req.scarlet.query.fullName = { contains: fullName, mode: 'insensitive' };
      })
      .optional(),
    query('bio')
      .custom(async (bio, { req }) => {
        req.scarlet.query.bio = { contains: bio, mode: 'insensitive' };
      })
      .optional(),
    query('userId')
      .custom(async (userId, { req }) => {
        req.scarlet.query.userId = userId;
      })
      .optional(),
  ]);
}

module.exports = {
  // CRUD
  CreateValidator,
  ReadValidator,
  UpdateValidator,
  DeleteValidator,

  // OTHER
  WheresValidator
};
