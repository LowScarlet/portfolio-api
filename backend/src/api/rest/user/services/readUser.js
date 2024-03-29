const { db } = require('../../../../utils/database');
const selectUserField = require('./selectUserField');

async function readUser(user, where) {
  const { id } = where;
  const output = await db.user.findUnique({
    where: {
      id,
    },
    select: selectUserField(user)
  });

  return output;
}

module.exports = readUser;
