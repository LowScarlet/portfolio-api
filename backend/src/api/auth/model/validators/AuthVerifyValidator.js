const { body } = require('express-validator');
const verifyRefreshToken = require('../services/verifyRefreshToken');

function AuthVerifyValidator() {
  return [
    body('token')
      .custom(async (token) => {
        if (token != null) {
          const user = await verifyRefreshToken(token);
          if (!user) throw new Error('validations.refresh-token-not-found');
        }
      })
  ];
}

module.exports = AuthVerifyValidator;
