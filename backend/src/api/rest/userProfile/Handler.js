const { db } = require('../../../utils/database');

const dbModel = db.userProfile;

class UserProfileHandler {
  constructor(client) {
    this.client = client;
  }

  selectUserProfileField() {
    const { client } = this;
    if (!client || client.role === 'MEMBER') {
      return {
        id: true,
        avatar: true,
        fullName: true,
        bio: true,
        userId: true,
        createdAt: true,
        updatedAt: true
      };
    }

    return undefined;
  }

  async create(data) {
    const { avatar, fullName, bio, userId } = data;
    const output = await dbModel.create({
      data: {
        avatar,
        fullName,
        bio,
        User: {
          connect: {
            id: userId
          }
        }
      },
      select: this.selectUserProfileField(),
    });

    return output;
  }

  async read(where) {
    const { id } = where;
    const output = await dbModel.findUnique({
      where: {
        id,
      },
      select: this.selectUserProfileField()
    });

    return output;
  }

  async readAll(where, skip, take) {
    const { fullName, bio } = where;
    const output = await dbModel.findMany({
      where: {
        fullName: fullName ? { contains: fullName } : undefined,
        bio: bio ? { contains: bio } : undefined,
      },
      select: this.selectUserProfileField(),
      skip,
      take
    });

    return output;
  }

  async update(data) {
    const { id, fullName, bio } = data;
    const output = await dbModel.update({
      data: {
        fullName: fullName || undefined,
        bio: bio || undefined,
      },
      where: {
        id,
      },
      select: this.selectUserProfileField()
    });

    return output;
  }

  async delete(where) {
    const { id } = where;
    const output = await dbModel.delete({
      where: {
        id,
      },
      select: this.selectUserProfileField()
    });

    return output;
  }
}

module.exports = UserProfileHandler;
