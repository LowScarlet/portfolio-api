const { db } = require('../../../utils/database');

const dbModel = db.portfolioEducation;

const viewField = (client) => {
  const scheme = {
    ADMIN: undefined,
    MEMBER: {
      id: true,
      degreeLevel: true,
      description: true,
      score: true,
      dissertationTitle: true,
      startAt: true,
      endAt: true,
      departmentId: true,
      institutionId: true,
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
