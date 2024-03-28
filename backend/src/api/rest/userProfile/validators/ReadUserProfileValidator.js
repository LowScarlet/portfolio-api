const { param } = require('express-validator');

const { db } = require('../../../../utils/database');

function ReadUserProfileValidator() {
  return [
    param('userProfileId')
      .if(param('userProfileId').exists())
      .custom(async (userProfileId) => {
        const user = await db.userProfile.findUnique({
          where: {
            id: userProfileId
          }
        });
        if (!user) throw new Error('validations.model.data-not-found');
      })
      .optional()
  ];
}

module.exports = ReadUserProfileValidator;
