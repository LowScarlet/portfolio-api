const { checkSchema } = require('express-validator');
const SchemaValidatorHandler = require('../../../../utils/services/SchemaValidatorHandler');
const { ModelSchema } = require('../../../rest/userProfile/Validators');
const FileValidatorHandler = require('../../../../utils/services/FileValidatorHandler');
const multerHandler = require('../../../../utils/multerHandler');

function UpdateValidator() {
  const { avatar, fullName, bio } = ModelSchema({
    checkIn: ['body']
  });

  const input = {
    avatar: { ...avatar },
    fullName: { ...fullName, optional: true },
    bio: { ...bio, optional: true },
  };

  return [
    FileValidatorHandler([
      multerHandler.array('avatar', 1),
    ]),
    SchemaValidatorHandler([checkSchema(input)])
  ];
}

module.exports = {
  UpdateValidator
};
