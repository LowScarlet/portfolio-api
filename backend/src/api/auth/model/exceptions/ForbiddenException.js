function ForbiddenException() {
  this.status = 403;
  this.message = 'utils.exceptions.forbidden';
}

module.exports = ForbiddenException;
