const { param } = require('express-validator');

const { db } = require('../../../../utils/database');

function ReadUserValidator() {
  return [
    param('userId')
      .if(param('userId').exists())
      .custom(async (userId) => {
        const user = await db.user.findUnique({
          where: {
            id: userId
          }
        });
        if (!user) throw new Error('validations.model.data-not-found');
      })
      .optional()
  ];
}

module.exports = ReadUserValidator;
