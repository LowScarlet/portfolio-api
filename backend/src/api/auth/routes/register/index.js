const { Router } = require('express');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const ValidationException = require('../../../../utils/exceptions/ValidationException');
const isNotAuthenticated = require('../../model/middlewares/isNotAuthenticated');
const generateTokens = require('../../model/services/generateTokens');
const hashPassword = require('../../model/services/hashPassword');
const hashToken = require('../../model/services/hashToken');
const AuthRegisterValidator = require('../../model/validators/AuthRegisterValidator');

const { db } = require('../../../../utils/database');

const router = Router();

router.post('/', [
  isNotAuthenticated,
  AuthRegisterValidator()
], async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const jti = uuidv4();

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword(password),
        UserProfile: { create: {} }
      }
    });

    const { accessToken, refreshToken } = generateTokens(user, jti);
    await db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        User: {
          connect: { id: user.id }
        }
      }
    });

    res.json({
      message: req.t('validations.auth.success-register'),
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

module.exports = router;
