const { db } = require('../../../../utils/database');
const stringToBoolean = require('../../../../utils/stringToBoolean');
const selectUserField = require('./selectUserField');

async function createUser(user, data) {
  const { username, email, password, role, isActive } = data;
  const output = await db.user.create({
    data: {
      username,
      email,
      password,
      role,
      isActive: stringToBoolean(isActive) || undefined
    },
    select: selectUserField(user),
  });

  return output;
}

module.exports = createUser;
