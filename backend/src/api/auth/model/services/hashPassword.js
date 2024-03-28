const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hashSync(password, 12);
}

module.exports = hashPassword;
