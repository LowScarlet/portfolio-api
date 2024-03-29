const { db } = require('../../../../utils/database');
const stringToBoolean = require('../../../../utils/stringToBoolean');
const selectUserField = require('./selectUserField');

async function updateUser(user, data) {
  const { id, username, email, password, role, isActive } = data;
  const output = await db.user.update({
    data: {
      username: username || undefined,
      email: email || undefined,
      password: password || undefined,
      role: role || undefined,
      isActive: stringToBoolean(isActive) || undefined
    },
    where: {
      id,
    },
    select: selectUserField(user)
  });

  return output;
}

module.exports = updateUser;
