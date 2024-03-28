const jwt = require('jsonwebtoken');

function generateRefreshToken(user, jti) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '48h',
  });
}

module.exports = generateRefreshToken;
