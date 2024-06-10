const { db } = require('../../../utils/database');

const dbModel = db.department;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      name: true,
      description: true,
      degreeId: true,
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
