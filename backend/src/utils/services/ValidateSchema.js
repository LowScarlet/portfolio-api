const ValidateSchemaDefault = ({ index, changeValue, checkIn, other }) => ({
  [index]: {
    in: checkIn,
    custom: {
      options: async (value, { req }) => {
        for (let i = 0; i < checkIn.length; i += 1) {
          req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
          req.scarlet[checkIn[i]][index] = changeValue ? changeValue(value) : value;
        }
      }
    },
    ...other
  }
});

const ValidateSchemaModel = ({ index, errorIf, changeValue, checkIn, dbModel, other }) => ({
  [index]: {
    in: checkIn,
    custom: {
      options: async (value, { req }) => {
        const model = await dbModel.findUnique({ where: { [index]: value } });
        if (errorIf === 'notExist') {
          if (!model) throw new Error('validations.model.data-not-found');
        } else if (errorIf === 'exist') {
          if (model) throw new Error('validations.model.data-found');
        }
        for (let i = 0; i < checkIn.length; i += 1) {
          req.scarlet[checkIn[i]] = req.scarlet[checkIn[i]] || {};
          req.scarlet[checkIn[i]][index] = changeValue ? changeValue(value) : value;
        }
      }
    },
    ...other
  }
});

const ValidateSchemaCustom = ({ index, checkIn, custom, other }) => ({
  [index]: {
    in: checkIn,
    custom,
    ...other
  }
});

module.exports = {
  ValidateSchemaDefault,
  ValidateSchemaModel,
  ValidateSchemaCustom
};
