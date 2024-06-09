const { db } = require('../../../utils/database');

const dbModel = db.socialMedia;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      name: true,
      url: true,
      isVerified: true,
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
