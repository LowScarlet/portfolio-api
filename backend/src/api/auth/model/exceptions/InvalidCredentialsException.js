function InvalidCredentialsException() {
  this.status = 401;
  this.message = 'utils.exceptions.invalid-credentials';
}

module.exports = InvalidCredentialsException;
