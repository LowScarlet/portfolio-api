const jwt = require('jsonwebtoken');
const hashToken = require('./hashToken');

const { db } = require('../../../../utils/database');

async function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, payload) => {
    if (err) return null;

    const hashedToken = hashToken(token);
    const refToken = await db.refreshToken.findUnique({
      where: {
        hashedToken
      }
    });

    if (!refToken) return null;

    if (refToken.revoked) return null;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp <= currentTimestamp) return null;
    const { userId } = payload;
    const userData = await db.user.findUnique({ where: { id: userId } });
    return userData;
  });
}

module.exports = verifyRefreshToken;
