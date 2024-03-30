const { db } = require('../../../utils/database');
const stringToBoolean = require('../../../utils/stringToBoolean');

const dbModel = db.user;

class UserHandler {
  constructor(client) {
    this.client = client;
  }

  selectUserField() {
    const { client } = this;
    if (!client || client.role === 'MEMBER') {
      return {
        id: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      };
    }

    return undefined;
  }

  async create(data) {
    const { username, email, password, role, isActive } = data;
    const output = await dbModel.create({
      data: {
        username: username || undefined,
        email: email || undefined,
        password: password || undefined,
        role: role || undefined,
        isActive: stringToBoolean(isActive) || undefined
      },
      select: this.selectUserField(),
    });

    return output;
  }

  async read(where) {
    const { id } = where;
    const output = await dbModel.findUnique({
      where: {
        id,
      },
      select: this.selectUserField()
    });

    return output;
  }

  async readAll(where, skip, take) {
    const { username, email, role, isActive } = where;
    const output = await dbModel.findMany({
      where: {
        username: username ? { contains: username } : undefined,
        email: email ? { contains: email } : email,
        role: role || undefined,
        isActive: stringToBoolean(isActive) || undefined
      },
      select: this.selectUserField(),
      skip,
      take
    });

    return output;
  }

  async update(data) {
    const { id, username, email, password, role, isActive } = data;
    const output = await dbModel.update({
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
      select: this.selectUserField()
    });

    return output;
  }

  async delete(where) {
    const { id } = where;
    const output = await dbModel.delete({
      where: {
        id,
      },
      select: this.selectUserField()
    });

    return output;
  }
}

module.exports = UserHandler;
