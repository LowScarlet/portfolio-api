function AuthorizedUserException() {
  this.status = 403;
  this.message = 'utils.exceptions.must-unauthorized-user';
}

function ForbiddenException() {
  this.status = 403;
  this.message = 'utils.exceptions.forbidden';
}

function InvalidCredentialsException() {
  this.status = 401;
  this.message = 'utils.exceptions.invalid-credentials';
}

function UnAuthorizedUserException() {
  this.status = 403;
  this.message = 'utils.exceptions.must-authorized-user';
}

module.exports = {
  AuthorizedUserException,
  ForbiddenException,
  InvalidCredentialsException,
  UnAuthorizedUserException
};
