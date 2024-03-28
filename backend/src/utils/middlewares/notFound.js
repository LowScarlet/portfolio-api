/* eslint-disable no-unused-vars */
const NotFoundException = require('../exceptions/NotFoundException');

module.exports = (req, res, next) => {
  throw new NotFoundException();
};
