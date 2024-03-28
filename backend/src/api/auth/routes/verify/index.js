const { Router } = require('express');
const { validationResult } = require('express-validator');
const ValidationException = require('../../../../utils/exceptions/ValidationException');
const AuthVerifyValidator = require('../../model/validators/AuthVerifyValidator');
const verifyRefreshToken = require('../../model/services/verifyRefreshToken');
const generateAccessToken = require('../../model/services/generateAccessToken');

const router = Router();

router.post('/', [
  AuthVerifyValidator()
], async (req, res, next) => {
  const { token } = req.body;
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new ValidationException(result.array()));
    }

    const user = await verifyRefreshToken(token);

    const accessToken = generateAccessToken(user);

    res.json({
      message: req.t('validations.auth.success-verify'),
      data: {
        accessToken,
        refreshToken: token
      }
    });
  } catch (err) {
    next(err);
  }
  return null;
});

module.exports = router;
