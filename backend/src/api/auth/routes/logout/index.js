const { Router } = require('express');
const { validationResult } = require('express-validator');
const ValidationException = require('../../../../utils/exceptions/ValidationException');
const isAuthenticated = require('../../model/middlewares/isAuthenticated');
const AuthLogoutValidator = require('../../model/validators/AuthLogoutValidator');
const hashToken = require('../../model/services/hashToken');

const { db } = require('../../../../utils/database');

const router = Router();

router.post('/', [
  isAuthenticated,
  AuthLogoutValidator()
], async (req, res, next) => {
  const { hashedToken } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const token = hashToken(hashedToken);

    await db.refreshToken.update({
      where: {
        hashedToken: token
      },
      data: {
        revoked: true
      }
    });

    res.json({
      message: req.t('validations.auth.success-logout'),
    });
  } catch (err) {
    next(err);
  }
  return null;
});

module.exports = router;
