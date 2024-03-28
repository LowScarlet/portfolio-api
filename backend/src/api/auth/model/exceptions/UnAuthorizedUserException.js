function UnAuthorizedUserException() {
  this.status = 401;
  this.message = 'utils.exceptions.must-authorized-user';
}

module.exports = UnAuthorizedUserException;
