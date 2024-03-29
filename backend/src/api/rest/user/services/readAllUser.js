const { db } = require('../../../../utils/database');
const stringToBoolean = require('../../../../utils/stringToBoolean');
const selectUserField = require('./selectUserField');

async function readAllUser(user, where, skip, take) {
  const { username, email, role, isActive } = where;
  const output = await db.user.findMany({
    where: {
      username: username ? {
        contains: username
      } : undefined,
      email: email ? {
        contains: email
      } : email,
      role: role || undefined,
      isActive: stringToBoolean(isActive) || undefined
    },
    select: selectUserField(user),
    skip,
    take
  });

  return output;
}

module.exports = readAllUser;
