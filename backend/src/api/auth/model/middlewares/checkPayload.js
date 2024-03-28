const jwt = require('jsonwebtoken');

const { db } = require('../../../../utils/database');

async function checkPayload(req, res, next) {
  if (process.env.DEV_MODE === 'true') return next();
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (payload) {
      req.payload = payload;
      req.user = await db.user.findUnique({
        where: {
          id: payload.userId
        },
        select: {
          id: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });
    }
  } catch (err) { /* empty */ }

  return next();
}

module.exports = checkPayload;
