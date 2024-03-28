function NotFoundException() {
  this.status = 404;
  this.message = 'utils.middlewares.not-found';
}

module.exports = NotFoundException;
