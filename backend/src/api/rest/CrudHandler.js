class CrudHandler {
  constructor(dbModel) {
    this.dbModel = dbModel;
    this.viewField = null;
  }

  setViewField(viewField) {
    this.viewField = viewField;
  }

  async create(data) {
    const output = await this.dbModel.create({
      data,
      select: this.viewField,
    });

    return output;
  }

  async read(id) {
    const output = await this.dbModel.findUnique({
      where: { id },
      select: this.viewField
    });

    return output;
  }

  async reads(where, skip, take) {
    const output = await this.dbModel.findMany({
      where,
      select: this.viewField,
      skip,
      take
    });

    return output;
  }

  async update(id, data) {
    const output = await this.dbModel.update({
      data,
      where: { id },
      select: this.viewField
    });

    return output;
  }

  async delete(id) {
    const output = await this.dbModel.delete({
      where: {
        id,
      },
      select: this.viewField
    });

    return output;
  }
}

module.exports = CrudHandler;
