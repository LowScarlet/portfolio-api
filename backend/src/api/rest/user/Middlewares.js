const { Role } = require('@prisma/client');
const { db } = require('../../../utils/database');
const { RoleNotAllowedException } = require('./Exceptions');

async function isAdministrator(req, res, next) {
  if (process.env.DEV_MODE === 'true') return next();
  const { userId } = req.payload;

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.role !== Role.ADMIN) {
      const exception = new RoleNotAllowedException();
      res.status(exception.status);
      throw exception;
    }
  } catch (error) {
    next(error);
  }
  return next();
}

module.exports = {
  isAdministrator
};
