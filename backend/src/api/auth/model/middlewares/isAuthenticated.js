const jwt = require('jsonwebtoken');
const UnAuthorizedUserException = require('../exceptions/UnAuthorizedUserException');

function isAuthenticated(req, res, next) {
  if (process.env.DEV_MODE === 'true') return next();
  const { authorization } = req.headers;

  const exception = new UnAuthorizedUserException();

  if (!authorization) {
    res.status(exception.status);
    throw exception;
  }

  try {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    res.status(exception.status);
    throw exception;
  }

  return next();
}

module.exports = isAuthenticated;
