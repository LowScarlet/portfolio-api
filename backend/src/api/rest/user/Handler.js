const { db } = require('../../../utils/database');

const dbModel = db.user;

class UserHandler {
  constructor(client) {
    this.client = client;
  }

  viewField() {
    const { client } = this;
    const scheme = {
      ADMIN: undefined,
      MEMBER: {
        id: true,
        username: true,
        password: false,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    };

    return client ? scheme[client.role] : scheme.MEMBER;
  }

  async create(data) {
    const output = await dbModel.create({
      data,
      select: this.viewField(),
    });

    return output;
  }

  async read(id) {
    const output = await dbModel.findUnique({
      where: { id },
      select: this.viewField()
    });

    return output;
  }

  async reads(where, skip, take) {
    const output = await dbModel.findMany({
      where,
      select: this.viewField(),
      skip,
      take
    });

    return output;
  }

  async update(id, data) {
    const output = await dbModel.update({
      data,
      where: { id },
      select: this.viewField()
    });

    return output;
  }

  async delete(id) {
    const output = await dbModel.delete({
      where: {
        id,
      },
      select: this.viewField()
    });

    return output;
  }
}

module.exports = UserHandler;
