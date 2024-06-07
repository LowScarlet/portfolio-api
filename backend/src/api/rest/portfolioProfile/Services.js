const { db } = require('../../../utils/database');

const dbModel = db.portfolio;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      logo: true,
      banner: true,
      fullName: true,
      label: true,
      nickname: true,
      about: true,
      country: true,
      email: true,
      phone: true,
      website: true,
      portfolioId: true
    }
  };

  return client ? scheme[client.role] : scheme.MEMBER;
};

module.exports = {
  dbModel,
  viewField
};
