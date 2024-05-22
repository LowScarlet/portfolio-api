const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { db } = require('../../../utils/database');
const { viewField } = require('../../rest/user/Services');
const { createToken, hashPassword } = require('../../auth/Services');

const router = Router();

function generateShortUid(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';
  for (let i = 0; i < length; i += 1) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: `${process.env.FRONTEND_URL}/api/oauth/google`
}, (accessToken, refreshToken, profile, done) => {
  const data = {
    id: profile.id,
    fullName: profile.displayName,
    email: profile.emails[0].value,
  };

  return done(null, data);
}));

router.get('/', [
  passport.authenticate('google', { scope: ['profile', 'email'] })
]);

router.get('/exchange', [
  passport.authenticate('google', { session: false })
], async (req, res, next) => {
  try {
    const { fullName, email } = req.user;

    const jti = uuidv4();
    const user = await db.user.findUnique({ where: { email }, select: viewField() }) || await db.user.create({
      data: {
        username: `user_${generateShortUid()}`,
        email,
        isActive: true,
        password: hashPassword(jti),
        UserProfile: {
          create: {
            fullName
          }
        }
      },
      select: viewField()
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

module.exports = router;
