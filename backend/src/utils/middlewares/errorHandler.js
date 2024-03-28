/* eslint-disable no-unused-vars */

module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => (validationErrors[error.path] = req.t(error.msg)));
  }
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;
  res.header('Content-Type', 'application/json');
  res.status(status || 500);
  res.json({
    status: status || 500,
    message: req.t(message),
    timestamp: Date.now(),
    path: req.originalUrl,
    validationErrors,
    stack,
  });
};
