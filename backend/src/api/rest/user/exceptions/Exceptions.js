function RoleNotAllowedException() {
  this.status = 403;
  this.message = 'utils.exceptions.role-not-allowed';
}

module.exports = {
  RoleNotAllowedException
};
