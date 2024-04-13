const jwt = require('jsonwebtoken');

const { db } = require('../../utils/database');
const { UnAuthorizedUserException, AuthorizedUserException } = require('./Exceptions');

async function CheckPayload(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!payload) return next();

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
  } catch (err) { /* empty */ }

  return next();
}

function IsAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    const exception = new UnAuthorizedUserException();

    res.status(exception.status);
    throw exception;
  }

  try {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    const exception = new UnAuthorizedUserException();

    res.status(exception.status);
    throw exception;
  }

  return next();
}

function IsNotAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const exception = new AuthorizedUserException();

    res.status(exception.status);
    throw exception;
  }

  try {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const exception = new AuthorizedUserException();
    res.status(exception.status);
    throw exception;
  } catch (err) { /* empty */ }

  return next();
}

module.exports = {
  CheckPayload,
  IsAuthenticated,
  IsNotAuthenticated
};
