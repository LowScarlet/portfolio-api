const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../../utils/database');
const { generateAccessToken, hashToken, hashPassword, verifyRefreshToken, createToken } = require('./Services');
const { LoginValidator, RegisterValidator, VerifyValidator, LogoutValidator } = require('./Validators');
const { IsNotAuthenticated, IsAuthenticated } = require('./Middlewares');
const { viewField } = require('../rest/user/Services');

const router = Router();

router.post('/login', [
  IsNotAuthenticated,
  LoginValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { id } = scarlet.body;

    const jti = uuidv4();
    const user = await db.user.findUnique({
      where: { id },
      select: {
        ...viewField(),
        UserProfile: true
      }
    });

    const { accessToken, refreshToken } = await createToken(user, jti);

    res.json({
      message: req.t('validations.auth.success-login'),
      data: {
        user,
        accessToken: {
          token: accessToken.token,
          expiredAt: accessToken.expirationDate
        },
        refreshToken: {
          token: refreshToken.token,
          expiredAt: refreshToken.expirationDate
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/register', [
  IsNotAuthenticated,
  RegisterValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { username, email, password } = scarlet.body;

    const jti = uuidv4();

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword(password),
        UserProfile: { create: {} }
      },
      select: {
        ...viewField(),
        UserProfile: true
      }
    });

    const { accessToken, refreshToken } = await createToken(user, jti);

    res.json({
      message: req.t('validations.auth.success-login'),
      data: {
        user,
        accessToken: {
          token: accessToken.token,
          expiredAt: accessToken.expirationDate
        },
        refreshToken: {
          token: refreshToken.token,
          expiredAt: refreshToken.expirationDate
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/verify', [
  VerifyValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { refreshToken } = scarlet.body;

    const user = await verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(user);

    res.json({
      message: req.t('validations.auth.success-register'),
      data: {
        token: accessToken.token,
        expiredAt: accessToken.expirationDate
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', [
  IsAuthenticated,
  LogoutValidator()
], async (req, res, next) => {
  try {
    const { scarlet } = req;
    const { refreshToken } = scarlet.body;

    const hashedToken = hashToken(refreshToken);

    await db.refreshToken.update({
      where: {
        hashedToken
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
});

module.exports = router;
