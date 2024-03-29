const { db } = require('../../../../utils/database');
const selectUserField = require('./selectUserField');

async function deleteUser(user, where) {
  const { id } = where;
  const output = await db.user.delete({
    where: {
      id,
    },
    select: selectUserField(user)
  });

  return output;
}

module.exports = deleteUser;
