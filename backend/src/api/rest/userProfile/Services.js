const { db } = require('../../../utils/database');

const dbModel = db.userProfile;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      avatar: true,
      fullName: true,
      bio: true,
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
