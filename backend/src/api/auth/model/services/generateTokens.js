const generateAccessToken = require('./generateAccessToken');
const generateRefreshToken = require('./generateRefreshToken');

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = generateTokens;
