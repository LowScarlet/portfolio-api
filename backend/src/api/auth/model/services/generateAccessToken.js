const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
}

module.exports = generateAccessToken;
