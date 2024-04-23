const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { db } = require('../../utils/database');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const accessExpiresIn = 5 * 60; // 15 menit
const refreshExpiresIn = 48 * 3600; // 48 jam

const hashSalt = 12;
const hashAlgorithm = 'sha512';
const hashDigest = 'hex';

function generateAccessToken(user) {
  const token = jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, { expiresIn: accessExpiresIn });
  const expirationDate = new Date(Date.now() + (accessExpiresIn * 1000));

  return {
    token,
    expirationDate
  };
}

function generateRefreshToken(user, jti) {
  const token = jwt.sign({ userId: user.id, jti }, JWT_REFRESH_SECRET, { expiresIn: refreshExpiresIn });
  const expirationDate = new Date(Date.now() + (refreshExpiresIn * 1000));

  return {
    token,
    expirationDate
  };
}

function hashPassword(password) {
  return bcrypt.hashSync(password, hashSalt);
}

function hashToken(token) {
  return crypto.createHash(hashAlgorithm).update(token).digest(hashDigest);
}

async function createToken(user, jti,) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  await db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken.token),
      User: {
        connect: {
          id: user.id
        }
      }
    }
  });

  return {
    accessToken,
    refreshToken
  };
}

async function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET, async (err, payload) => {
    const { userId } = payload;

    if (err) return null;

    const refToken = await db.refreshToken.findUnique({ where: { hashedToken: hashToken(token) } });

    if (!refToken || refToken.revoked || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    const userData = await db.user.findUnique({ where: { id: userId } });

    return userData;
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  hashToken,
  createToken,
  verifyRefreshToken
};