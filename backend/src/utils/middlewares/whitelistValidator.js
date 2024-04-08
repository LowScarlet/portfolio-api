const { validationResult } = require('express-validator');

const whitelistValidator = (scheme) => (req, res, next) => {
  // Perform validation
  Promise.all(scheme.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next(); // Proceed to the next middleware if validation succeeds
  });
  return next();
};

module.exports = whitelistValidator;
