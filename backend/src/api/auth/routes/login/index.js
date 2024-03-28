const { Router } = require('express');

const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const ValidationException = require('../../../../utils/exceptions/ValidationException');
const isNotAuthenticated = require('../../model/middlewares/isNotAuthenticated');
const generateTokens = require('../../model/services/generateTokens');
const hashToken = require('../../model/services/hashToken');
const AuthLoginValidator = require('../../model/validators/AuthLoginValidator');

const { db } = require('../../../../utils/database');
const InvalidCredentialsException = require('../../model/exceptions/InvalidCredentialsException');

const router = Router();

router.post('/', [
  isNotAuthenticated,
  AuthLoginValidator()
], async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const jti = uuidv4();

    const user = await db.user.findUnique({
      where: {
        email,
      }
    });
    if (!user) {
      return next(new InvalidCredentialsException());
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new InvalidCredentialsException());
    }

    const { accessToken, refreshToken } = generateTokens(user, jti);
    await db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        User: {
          connect: {
            id: user.id
          }
        }
      }
    });

    res.json({
      message: req.t('validations.auth.success-login'),
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
