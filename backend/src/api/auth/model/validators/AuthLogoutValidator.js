const { body } = require('express-validator');
const hashToken = require('../services/hashToken');

const { db } = require('../../../../utils/database');

function AuthLogoutValidator() {
  return [
    body('hashedToken')
      .custom(async (hashedToken) => {
        if (hashedToken != null) {
          const token = hashToken(hashedToken);
          const refToken = await db.refreshToken.findUnique({
            where: {
              hashedToken: token
            }
          });
          if (!refToken) throw new Error('validations.auth.token-not-found');
          if (refToken.revoked) throw new Error('validations.auth.token-expired');
        }
      })
  ];
}

module.exports = AuthLogoutValidator;
