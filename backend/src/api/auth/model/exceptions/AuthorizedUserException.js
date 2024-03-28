function AuthorizedUserException() {
  this.status = 403;
  this.message = 'utils.exceptions.must-unauthorized-user';
}

module.exports = AuthorizedUserException;
