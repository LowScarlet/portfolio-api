/* eslint-disable no-unused-vars */
const NotFoundException = require('./exceptions/NotFoundException');

const NotFound = (req, res, next) => {
  throw new NotFoundException();
};

module.exports = NotFound;
