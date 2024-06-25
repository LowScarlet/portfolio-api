const { db } = require('../../../utils/database');

const dbModel = db.company;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      name: true,
      description: true,
      website: true,
      createdAt: true,
      updatedAt: true,
    }
  };

  return client ? scheme[client.role] : scheme.MEMBER;
};

module.exports = {
  dbModel,
  viewField
};
