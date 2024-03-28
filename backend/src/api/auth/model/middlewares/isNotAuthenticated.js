const jwt = require('jsonwebtoken');
const AuthorizedUserException = require('../exceptions/AuthorizedUserException');

function isNotAuthenticated(req, res, next) {
  if (process.env.DEV_MODE === 'true') return next();
  const { authorization } = req.headers;

  const exception = new AuthorizedUserException();

  if (authorization) {
    res.status(exception.status);
    throw exception;
  }

  try {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    res.status(exception.status);
    throw exception;
  } catch (err) { /* empty */ }

  return next();
}

module.exports = isNotAuthenticated;
