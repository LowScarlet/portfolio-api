const { db } = require('../../../utils/database');

const dbModel = db.portfolioConnect;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      identifier: true,
      socialMediaId: true,
      portfolioId: true,
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
