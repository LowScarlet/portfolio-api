const { db } = require('../../../utils/database');

const dbModel = db.user;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      username: true,
      password: false,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true
    }
  };

  return client ? scheme[client.role] : scheme.MEMBER;
};

module.exports = {
  dbModel,
  viewField
};
